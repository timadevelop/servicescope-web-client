import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';


export class MetaConfig {
  title: string;
  description: string;
  image?: string; // url
  keywords?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {


  constructor(private meta: Meta) { }

  generateTags(config: MetaConfig) {
    config = {
      title: config.title || 'Serviscope',
      description: config.description || 'Search services TODO',
      image: config.image || 'https://instafire-app.firebaseapp.com/assets/seo.jpeg',
      keywords: config.keywords || 'services,job,post,offer,tag'
    }

    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:site', content: '@teemofeev' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Serviscope' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image.replace('https', 'http') });
    this.meta.updateTag({ property: 'og:image:secure_url', content: config.image });
  }

}
