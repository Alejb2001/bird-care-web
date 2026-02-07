import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BirdSpeciesService } from '../../services/bird-species.service';
import { BirdSpecies } from '../../models/bird-species.model';

@Component({
  selector: 'app-species-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './species-list.html',
  styleUrl: './species-list.css',
})
export class SpeciesList implements OnInit {
  allSpecies: BirdSpecies[] = [];

  constructor(private speciesService: BirdSpeciesService) {}

  ngOnInit(): void {
    this.speciesService.getAllSpecies().subscribe(species => {
      this.allSpecies = species;
    });
  }
}
