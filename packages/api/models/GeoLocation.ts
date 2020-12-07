export class GeoLocation {
    
    public static Latitude : string = "latitude";
    public static Longitude : string = "longitude";
    public static Name : string = "name";

    private lat: string;
    private long: string;
    private name: string;

    public constructor(nameOfLocation: string, latitude: string, longitude: string)  {
        this.lat = latitude;
        this.long = longitude;
        this.name = nameOfLocation;
    }

    get latitude(): string {
        return this.lat;
    }
    
    set latitude(latitude: string) {
        this.lat = latitude;
    }

    get longitude(): string {
        return this.long;
    }
    
    set longitude(longitude: string) {
        this.lat = longitude;
    }

    get nameOfLocation(): string {
        return this.name;
    }
    
    set nameOfLocation(nameOfLocation: string) {
        this.name = nameOfLocation;
    }
    

}