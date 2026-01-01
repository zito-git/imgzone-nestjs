export class ImagesEntityToDto {
  id: string;
  userid: string;
  role: string;
  created: string;
  imgList: string[];

  constructor(images: any) {
    this.id = images.id.toString();

    this.imgList =
      images.status === true
        ? images.img.map((url: string) =>
            url.replace(/\.(jpg|jpeg|png|heic|heif)$/i, '.webp'),
          )
        : ['private'];

    this.created = this.formatKST(images.created);
    this.userid = images.status === true ? images.member.userid : 'private';
    this.role = images.status === true ? images.member.role : 'private';
  }

  private formatKST(date: Date): string {
    const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    const yyyy = kst.getFullYear();
    const mm = String(kst.getMonth() + 1).padStart(2, '0');
    const dd = String(kst.getDate()).padStart(2, '0');
    const hh = String(kst.getHours()).padStart(2, '0');
    const mi = String(kst.getMinutes()).padStart(2, '0');
    const ss = String(kst.getSeconds()).padStart(2, '0');

    return `${yyyy}.${mm}.${dd} ${hh}:${mi}:${ss}`;
  }
}
