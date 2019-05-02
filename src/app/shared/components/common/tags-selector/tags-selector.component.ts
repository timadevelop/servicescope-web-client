import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { TagsService } from 'src/app/shared/services/tags.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Tag } from 'src/app/shared/models/Tag.models';
import { PaginatedApiResponse } from 'src/app/shared/models/api-response/paginated-api-response';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-tags-selector',
  templateUrl: './tags-selector.component.html',
  styleUrls: ['./tags-selector.component.scss']
})
export class TagsSelectorComponent implements OnInit {
  isLoading = false;

  tags: PaginatedApiResponse<Tag>;
  tagsSub$: Subscription;
  selectedTags: Array<string> = [];

  page = '1';
  pageSize = '10';

  createTagMode: boolean = true;

  @Input() maxTagCount: number = 5;
  @Output() onChange = new EventEmitter<Array<string>>();

  constructor(private tagsService: TagsService,
    private msgService: NzMessageService) { }

  ngOnInit(): void {
    this.tagsSub$ = this.tagsService.getTags('1', '10')
      .subscribe(t => this.tags = t);
  }


  onTagsChange(e) {
    this.onChange.emit(this.selectedTags);
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


  createNewTag(tagName: string) {
    console.log('creating tag: ', tagName);
    this.tagsService.createTag(tagName)
      .subscribe((t: Tag) => {
        this.tags.results.push(t);
        this.selectedTags.push(t.name);
        this.toggleCreateTagMode(false);
        this.msgService.success("Created tag " + tagName);
      },
      err => console.log(err))
  }
}
