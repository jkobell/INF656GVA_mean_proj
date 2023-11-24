import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin.service';

@Component({
  selector: 'app-admincrud',
  templateUrl: './admincrud.component.html',
  styleUrl: './admincrud.component.css'
})
export class AdmincrudComponent implements OnInit {
  currentUser: Object = {};

  constructor(
    public adminService: AdminService,
    //private activatedRoute: ActivatedRoute
  ) {
    /* let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.adminService.getUserProfile(id).subscribe(res => {
      this.currentUser = res.msg;
    }) */
  }

  logout() {
    this.adminService.logout()
  }

  ngOnInit() { }
}
