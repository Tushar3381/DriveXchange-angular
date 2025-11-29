export interface Car {
    id: number;            // Manual ID
    brand: string;
    model: string;
    color: string;
    price: number;
    description: string;  
    imageUrl?: string;     // optional, stores filename of uploaded image
}
