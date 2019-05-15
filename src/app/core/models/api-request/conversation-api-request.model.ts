export class ConversationApiRequest {
  constructor(
    public title: string,
    public users: Array<string> // urls to users
  ) { }
}
