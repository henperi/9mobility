export interface AuthUser {
  expiresIn: Date | string | number;
  accesssToken: string;
  firstName: string;
  lastName: string;
  email: string;
  hasWallet: boolean;
  walletAccount: string;
  refreshToken: string;
}

// accesssToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA5LzA5L2lkZW50aXR5L2NsYWltcy9hY3RvciI6IjA5MDk1MDE3MTUwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOlsiOCIsIjA5MDk1MDE3MTUwIl0sImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJPcmppIElubm9jZW50IiwiZW1haWwiOiJvcmppaW5ub2NlbnRAaG90bWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IjA5MDk1MDE3MTUwIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiUmVnaXN0ZXJlZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvdXNlcmRhdGEiOiJ7XCJVc2VySWRcIjo4LFwiVXNlclR5cGVcIjpcIkN1c3RvbWVyXCIsXCJNb2JpbGVOdW1iZXJcIjpcIjA5MDk1MDE3MTUwXCIsXCJXYWxsZXRBY2NvdW50Tm9cIjpcIjk2NDUxNTQwOFwiLFwiQ3VzdG9tZXJOYW1lXCI6XCJPcmppIElubm9jZW50XCIsXCJVc2VyRW1haWxcIjpcIm9yamlpbm5vY2VudEBob3RtYWlsLmNvbVwifSIsIm5iZiI6MTU5OTY1Njk0OCwiZXhwIjoxNTk5NjU4NzQ4LCJpc3MiOiJodHRwOi8vd3d3Lm1vYmlsaXR5Lm5nIiwiYXVkIjoiaHR0cDovL3d3dy5tb2JpbGl0eS5uZyJ9._ZxMtoHLdS8SfQvJI69_XcFszEy9xtbrjd1Gfm8E0Mk"
// email: "orjiinnocent@hotmail.com"
// expiresIn: "2020-09-09T14:14:08.0695404+01:00"
// firstName: "Orji"
// hasWallet: false
// lastName: "Innocent"
// refreshToken: "AZ//HEazZYf40V+BVx5lczyxspDY/hVAssD03Gb0KbY="
// walletAccount: ""
