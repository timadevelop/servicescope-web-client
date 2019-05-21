import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/core/models/Service.model';
import { ServicesService } from 'src/app/core/services/services.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-promote-service',
  templateUrl: './promote-service.component.html',
  styleUrls: ['./promote-service.component.scss']
})
export class PromoteServiceComponent implements OnInit {
  loading: boolean = false;
  service: Service;
  selectedPlan: 'basic' | 'pro' = null;

  promoteServiceForm = this.fb.group({
    // string
    title: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(70)]], // todo
    // string
    price: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private servicesService: ServicesService) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { service: Service }) => {
      if (!data.service) {
        console.warn('Not found service');
        // this.router.navigate(['/404'])
        return;
      }
      this.service = data.service;
    });

  }
}
