export interface Car {
    _id?: string;
    title: string;
    description: string;
    price: number | string;
  
    brand: string;
    model: string;
    mileage: number | string;
    condition: string;
    firstRegistration: string;
    fuelType: string;
    power: number | string;
    gearbox: string;
    vehicleType: string;
    doors: string;
    huUntil: string;
    emissionSticker: string;
    emissionClass: string;
    color: string;
  
    features: string[];
    images: string[];
    coverImage?: string | null;
  }
  