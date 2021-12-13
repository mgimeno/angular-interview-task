export class CommonUtils {
  public static isLargeScreen(): boolean {
    return window.innerWidth >= 800;
  }

  public static scrollToBottom(afterMilliseconds: number = 700): void{
  
      setTimeout(() => {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      }, afterMilliseconds);
      
  }
}
