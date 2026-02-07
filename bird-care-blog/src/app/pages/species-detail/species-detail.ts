import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BirdSpeciesService } from '../../services/bird-species.service';
import { BirdSpecies } from '../../models/bird-species.model';

@Component({
  selector: 'app-species-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './species-detail.html',
  styleUrl: './species-detail.css',
})
export class SpeciesDetail implements OnInit {
  species: BirdSpecies | undefined;
  relatedSpecies: BirdSpecies[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private speciesService: BirdSpeciesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.speciesService.getSpeciesById(id).subscribe(species => {
        this.species = species;

        if (!this.species) {
          this.router.navigate(['/especies']);
          return;
        }
      });

      // Get related species (all others)
      this.speciesService.getAllSpecies().subscribe(allSpecies => {
        this.relatedSpecies = allSpecies
          .filter(s => s.id !== id)
          .slice(0, 3);
      });
    });
  }

  getStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < rating ? 1 : 0);
  }
}
