export interface PhotosResponse {
  id: number;
  url: string;
}

export interface CoordsResponse {
  latitude: number;
  longitude: number;
}

export interface PropertiesResponse {
  id: number;
  ownerName: string;
  description: string;
  address: string;
  photos: PhotosResponse[];
  contact: string;
  coords: CoordsResponse;
}
