import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule, QuillEditorComponent } from 'ngx-quill';
import { SafePipe } from './safe.pipe';


@NgModule({
  declarations: [SafePipe],
  imports: [
    CommonModule,
    QuillModule.forRoot({
      modules: {
        syntax: false,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
          ['blockquote', 'code-block'],
          [{ 'header': 1 }, { 'header': 2 }],               // custom button values
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
          [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        ]
      }
    })
  ],
  exports: [
    QuillEditorComponent,
    SafePipe
  ]
})
export class RichTextEditorModule { }
