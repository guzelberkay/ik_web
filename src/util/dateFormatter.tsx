export const dateToEpoch =(dateString:string): number =>{
    const date = new Date(dateString);
    
    // Date nesnesini epoch time'a dönüştürme (milisaniye cinsinden)
    const epochTime = date.getTime();
    
    // Saniye cinsinden epoch time dönüştürme
    return Math.floor(epochTime / 1000);
}
export function epochToDate(timestamp: number): string {
    console.log('timestamp: ', timestamp);
    // Zaman damgasını milisaniyeye çevirin
    const date = new Date(timestamp * 1000);
  
    // Gün, ay ve yıl bilgilerini alın
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Ay değeri 0'dan başladığı için 1 ekliyoruz
    const year = date.getUTCFullYear();
  
    // gg-aa-yyyy formatında birleştirin
    return `${day}-${month}-${year}`;
  }