export const dateToEpoch =(dateString:string): number =>{
    const date = new Date(dateString);
    
    // Date nesnesini epoch time'a dönüştürme (milisaniye cinsinden)
    const epochTime = date.getTime();
    
    // Saniye cinsinden epoch time dönüştürme
    return Math.floor(epochTime / 1000);
}