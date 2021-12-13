export class CommonUtils {
  public static isLargeScreen(): boolean {
    return window.innerWidth >= 800;
  }

  public static scrollToId(id: string, behavior: ScrollBehavior = 'smooth', afterMilliseconds: number = 700): void{
    

      setTimeout(() => {
        const element = document.getElementById(id);
        if(element){
        element.scrollIntoView({
          behavior
        });
      }
      }, afterMilliseconds);
      
    
  }
}
