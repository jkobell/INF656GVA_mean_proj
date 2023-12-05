import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AdminService } from 'src/app/admin.service';
import { Router } from '@angular/router';
import { ListingImage } from 'src/app/listings/listings_image';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.css'
})
export class ImageUploadComponent {
  image_upload_message?: string;
  //uploadImageForm: FormGroup;
  filename?: string;
  public uploadImage = {} as ListingImage;

  constructor(
    //public formBuilder: FormBuilder,
    public adminService: AdminService,
    public router: Router
  ) {
    /* this.uploadImage.name = '',
    this.uploadImage.description = '',
    this.uploadImage.size = '',
    this.uploadImage.image = '' */
    /* this.uploadImageForm = this.formBuilder.group({
    name: [''],
    description: [''],
    size: [''],
    image: ['']
  }) */
  }

  cancel_register() {
    this.router.navigate(['admin/admins/admincrud']);
  }

  async onFileSelected(event: any) {
    this.image_upload_message = '';
    const file:File = event.target.files[0];
    if (file) {
      this.filename = file.name;
      this.uploadImage.name = file.name;
      //this.uploadImage.description = file.type;
      this.uploadImage.size = file.size.toFixed();
      
      const b64string = await this.convertToBase64(file);
      if (b64string) {
        const b64string_split = b64string.split(',');
        if (b64string_split && b64string_split.length > 1) {
          this.uploadImage.description = b64string_split[0];
          this.uploadImage.image = b64string_split[1];
        }
      }
       

      this.createImage();
      
      

      //const upload$ = this.http.post("/api/thumbnail-upload", formData);

      //upload$.subscribe();
    }
  }

  convertToBase64(file: Blob): Promise<string> {
    let reader = new FileReader();
    let result_promise = new Promise<string>((resolve) => {
      reader.readAsDataURL(file);    
      reader.onload = (event: any) => {
        //console.log('nottostring: ',event.target.result);
        /* this.uploadImage.image = event.target.result;  */ 
        resolve(event.target.result);     
      }; 
      reader.onerror = (error) => {
        //console.log('File read error: ', error);
        this.image_upload_message = `File read error: ${error}`;
      };
    })
    return result_promise;
  }
  
  createImage() {
    this.adminService.createImage(this.uploadImage).subscribe({
      next: response_data => {
        if (response_data.status === 201) {
          //this.registerForm.reset()
          //this.router.navigate(['admin/login']);
          this.image_upload_message = response_data.success_message;
        }
        if (response_data.status === 400) {
          this.image_upload_message = response_data.error_message;
        }
        if (response_data.status === 500) {
          this.image_upload_message = response_data.fail_message;
        }
      },
      error: (error) => {
        this.image_upload_message = error;
      }      
    });
  }
}
