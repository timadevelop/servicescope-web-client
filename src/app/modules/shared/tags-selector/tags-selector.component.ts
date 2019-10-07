import { Component, OnInit, Output, EventEmitter, Input, OnChanges, forwardRef } from '@angular/core';
import { TagsService } from 'src/app/core/services/tags.service';
import { Subscription } from 'rxjs';
import { Tag } from 'src/app/core/models/Tag.models';
import { PaginatedApiResponse } from 'src/app/core/models/api-response/paginated-api-response';
import { NzMessageService } from 'ng-zorro-antd';
import { I18n } from '@ngx-translate/i18n-polyfill';

import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagsSelectorComponent),
  multi: true
};


@Component({
  selector: 'app-tags-selector',
  templateUrl: './tags-selector.component.html',
  styleUrls: ['./tags-selector.component.scss'],
  providers: [customValueProvider]
})
export class TagsSelectorComponent implements OnInit, OnChanges, ControlValueAccessor {

  //
  // ControlValueAccessor
  propagateChange: any = () => { };

  writeValue(value: Array<string>): void {
    if (value) this._selectedTags = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }
  setDisabledState(isDisabled: boolean): void { }
  // /ControlValueAccessor
  //

  isLoading = false;

  tags: PaginatedApiResponse<Tag>;
  tagsSub$: Subscription;
  _selectedTags: Array<string> = [];

  public set selectedTags(v) {
    this._selectedTags = v;
    this.onChange.emit(this._selectedTags);
    this.propagateChange(this._selectedTags);
  }

  public get selectedTags() {
    return this._selectedTags;
  }

  page = '1';
  pageSize = '10';

  maxTagNameLength = 35;

  createTagMode: boolean = false;

  @Input() maxTagCount: number = 5;
  @Input() defaultTags: Array<string>;
  @Output() onChange = new EventEmitter<Array<string>>();

  constructor(
    private tagsService: TagsService) { }

  ngOnInit(): void {
    this.tagsSub$ = this.tagsService.getTags('1', '10')
      .subscribe(t => this.tags = t);

    if (this.defaultTags) {
      this.selectedTags = this.defaultTags;
    }
  }

  ngOnChanges() {
    if (this.defaultTags) {
      this.selectedTags = this.defaultTags;
    }
  }

  reset() {
    this.selectedTags = [];
  }

  public trackByName(index, item) {
    return item.name;
  }


  public isSelected(tag: string) {
    const name = tag.toLowerCase();
    return this.selectedTags.filter(t => t.toLowerCase() == name).length > 0;
  }

  onSearch(query: string): void {
    this.isLoading = true;

    this.tagsSub$ = this.tagsService.getTags(this.page, this.pageSize, query)
      .subscribe(v => {
        this.tags = v;
        this.isLoading = false;
      });

  }

  loadMoreTags(): void {
    if (this.tags.next) {
      this.tagsSub$.unsubscribe();

      this.isLoading = false;
      this.tagsSub$ = this.tagsService.getNextTags(this.tags.next)
        .subscribe(v => {
          this.appendTags(v);
          this.isLoading = false;
        });
    }
  }

  private appendTags(response: PaginatedApiResponse<Tag>) {
    if (this.tags) {
      const set = new Set([...this.tags.results, ...response.results]);
      response.results = Array.from(set.values());
    }
    this.tags = response;
  }

  toggleCreateTagMode(b: boolean = null) {
    if (b !== null) {
      this.createTagMode = b;
    } else {
      this.createTagMode = !this.createTagMode;
    }
  }

}
