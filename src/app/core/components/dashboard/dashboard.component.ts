import { Component, OnInit } from '@angular/core';
import { AppStateService } from '../../services/app-state/app-state.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(public appStateService: AppStateService) {}

  ngOnInit() {}

  get getCheckedProductCount(): number {
    return this.appStateService.productState.products.filter((p) => p.checked)
      .length;
  }
}
