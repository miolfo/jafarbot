export default class StreamInfo {

  private online: boolean;
  private title: string;
  private viewerCount: number;
  private onlineTime: string;

  constructor(jsonData) {
    if (jsonData && jsonData.data && jsonData.data[0] && jsonData.data[0]) {
      const userData = jsonData.data[0];
      this.online = true;
      this.viewerCount = userData.viewer_count;
      const diffMs = (new Date().getTime() - new Date(userData.started_at).getTime());
      const diffDays = Math.floor(diffMs / 86400000);
      const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
      const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
      this.onlineTime = diffHrs + " hours and " + diffMins + " minutes";
    } else {
      this.online = false;
    }
  }
}
