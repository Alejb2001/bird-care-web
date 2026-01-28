import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Source {
  id: string;
  title: string;
  organization: string;
  url: string;
  description: string;
  type: 'veterinary' | 'academic' | 'conservation' | 'book' | 'government';
}

@Component({
  selector: 'app-sources',
  imports: [CommonModule, RouterLink],
  templateUrl: './sources.html',
  styleUrl: './sources.css',
})
export class Sources {
  sources: Source[] = [
    {
      id: 'aav',
      title: 'Association of Avian Veterinarians (AAV)',
      organization: 'AAV',
      url: 'https://www.aav.org',
      description: 'Organización internacional de veterinarios especializados en aves. Proporciona estándares de cuidado, guías clínicas y educación continua.',
      type: 'veterinary'
    },
    {
      id: 'cornell',
      title: 'Cornell Lab of Ornithology',
      organization: 'Cornell University',
      url: 'https://www.birds.cornell.edu',
      description: 'Instituto líder en investigación sobre aves. Ofrece información científica sobre comportamiento, hábitat y conservación.',
      type: 'academic'
    },
    {
      id: 'avma',
      title: 'American Veterinary Medical Association - Exotic Pet Care',
      organization: 'AVMA',
      url: 'https://www.avma.org',
      description: 'Asociación veterinaria que proporciona guías de cuidado basadas en evidencia para mascotas exóticas incluidas aves.',
      type: 'veterinary'
    },
    {
      id: 'lafeber',
      title: 'Lafeber Veterinary Company',
      organization: 'Lafeber Vet',
      url: 'https://lafeber.com/pet-birds/',
      description: 'Recursos veterinarios especializados en nutrición y cuidado de aves. Fundado por el Dr. Ted Lafeber, DVM.',
      type: 'veterinary'
    },
    {
      id: 'vca',
      title: 'VCA Animal Hospitals - Avian Care',
      organization: 'VCA',
      url: 'https://vcahospitals.com/know-your-pet/bird-care',
      description: 'Red de hospitales veterinarios con información detallada sobre cuidado, salud y comportamiento de aves.',
      type: 'veterinary'
    },
    {
      id: 'world-parrot-trust',
      title: 'World Parrot Trust',
      organization: 'WPT',
      url: 'https://www.parrots.org',
      description: 'Organización internacional dedicada a la conservación de loros y educación sobre su cuidado apropiado.',
      type: 'conservation'
    },
    {
      id: 'beauty-of-birds',
      title: 'The Avian Welfare Coalition',
      organization: 'AWC',
      url: 'https://avianwelfare.org',
      description: 'Coalición de organizaciones dedicadas al bienestar de aves en cautiverio. Proporciona estándares de cuidado.',
      type: 'conservation'
    },
    {
      id: 'merck-vet',
      title: 'Merck Veterinary Manual - Exotic and Laboratory Animals',
      organization: 'Merck & Co.',
      url: 'https://www.merckvetmanual.com/exotic-and-laboratory-animals',
      description: 'Manual veterinario de referencia con información clínica sobre aves exóticas y domésticas.',
      type: 'academic'
    },
    {
      id: 'rspca',
      title: 'RSPCA Australia - Bird Care',
      organization: 'RSPCA',
      url: 'https://www.rspca.org.au/adopt-pet/caring-your-pet/birds',
      description: 'Organización de bienestar animal con guías detalladas sobre especies australianas como periquitos y ninfas.',
      type: 'government'
    },
    {
      id: 'harrison',
      title: 'Harrison\'s Bird Foods - Avian Medicine',
      organization: 'Harrison\'s',
      url: 'https://harrisonsbirdfoods.com',
      description: 'Recursos sobre nutrición aviar desarrollados por veterinarios aviares certificados.',
      type: 'veterinary'
    }
  ];

  books = [
    {
      title: 'The Complete Guide to Parrots',
      author: 'Mattie Sue Athan & Dianalee Deter',
      description: 'Guía completa sobre cuidado, comportamiento y salud de loros.'
    },
    {
      title: 'Manual of Parrot Behavior',
      author: 'Andrew U. Luescher, DVM',
      description: 'Manual académico sobre comportamiento de psitácidas basado en investigación científica.'
    },
    {
      title: 'Avian Medicine: Principles and Application',
      author: 'Branson W. Ritchie, DVM, et al.',
      description: 'Texto de referencia veterinaria sobre medicina aviar.'
    },
    {
      title: 'The Complete Bird Owner\'s Handbook',
      author: 'Gary Gallerstein, DVM',
      description: 'Guía práctica para propietarios con información veterinaria accesible.'
    }
  ];

  getSourcesByType(type: string): Source[] {
    return this.sources.filter(s => s.type === type);
  }
}
