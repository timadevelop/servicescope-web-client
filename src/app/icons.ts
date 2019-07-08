const ICON_PREFIX = 'ng-vlicon';
import * as antIcons from '@ant-design/icons-angular/icons';

// Additional icons
const customIcons = [
  {
    type: `${ICON_PREFIX}:facebook`, literal:
      '<svg viewBox="0 0 8 14" xmlns="http://www.w3.org/2000/svg"><path d="M7.2 2.323H5.923c-1.046 0-1.278.464-1.278 1.16V5.11h2.44l-.35 2.438h-2.09v6.387H2.09V7.548H0V5.11h2.09V3.252C2.09 1.162 3.368 0 5.342 0c.93 0 1.742.116 1.858.116v2.207z" fill="#4267B2" fill-rule="evenodd"></path></svg>'
  }
];


//
// unregistered icons while ssr
// register them while ssr-ing in app.component
//
const serverPlatformIcons = [
  antIcons.MailOutline,
  antIcons.LockOutline,
  antIcons.RocketOutline,
  antIcons.CloseOutline,
  antIcons.MessageOutline,
  antIcons.UserOutline,
  antIcons.RedoOutline,
  antIcons.LoadingOutline,
  antIcons.PictureOutline,
  antIcons.SearchOutline,
  antIcons.DownOutline,
  antIcons.ToolOutline,
  antIcons.AlignLeftOutline,
  antIcons.PlusOutline,
  antIcons.FontSizeOutline,
  antIcons.PhoneOutline,
  antIcons.TagsOutline,
  antIcons.FolderOutline,
  antIcons.EnvironmentOutline,
  antIcons.ClockCircleOutline,
  antIcons.CheckOutline,
  antIcons.LeftOutline,
  antIcons.RightOutline,
  antIcons.AppstoreOutline,
  antIcons.OrderedListOutline,
  antIcons.DownCircleOutline,
  antIcons.EuroOutline,
  antIcons.ArrowDownOutline,
  antIcons.ArrowUpOutline,
  antIcons.DollarTwoTone,
  antIcons.DollarOutline,
  antIcons.HeartOutline,
  antIcons.SmileTwoTone,
  antIcons.CheckCircleTwoTone,
  antIcons.CopyOutline,
  antIcons.TwitterOutline,
  antIcons.FullscreenOutline,
  antIcons.FullscreenExitOutline,
  antIcons.RiseOutline,
  antIcons.FilterOutline
];

export {
  customIcons,
  serverPlatformIcons
};
