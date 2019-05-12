import { Component, Input,Output,EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UploadService } from 'src/app/service/upload.service';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent {
  @Input()
  title:string 

  @Input()
  path:string 

  @Input()
  filetype:string 
  
  // 上传成功就返回了上传的文件路径名，失败则为空
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private snackBar: MatSnackBar,private uploadService: UploadService) { 
    this.filetype = "image/*";
    this.title = "请选择上传文件";
  }
  selectedFile: ImageSnippet;

  private handlerSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private handlerError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  removeFile():void{
    this.selectedFile  = null ;
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      const formData = new FormData();
      
      if ( this.path.length > 0  ){
        formData.append(this.path, file);
      }else{
        formData.append('file', file);
      }
      
      this.selectedFile.pending = true;
      this.uploadService.upload(formData)
      .subscribe(
        (event: {}) => {
          this.selectedFile.pending = false;
          this.handlerSuccess();
          this.change.emit(event['data']['filepath']);
          this.snackBar.open("upload successed !", "🍕 🍕 🍕", {
            duration: 5000,
          });
        },
        err => {
          this.selectedFile.pending = false;
          this.handlerError();
          this.change.emit("");
          this.snackBar.open("upload error...", err, {
            duration: 10000,
          });
        }
      );
      this.selectedFile.pending = true;
    });

    reader.readAsDataURL(file);
  }

}

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}
