import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const LocationSection: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleLocationSearch = () => {
    console.log('Searching for location:', location);
    // Here you could integrate geocoding to transform address to coordinates
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center = {
    lat: 13.0827, // Default coordinates for Chennai, India
    lng: 80.2707,
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <MapPin className="h-6 w-6 text-roadapp-purple" />
          Road Location
        </CardTitle>
        <CardDescription>
          Provide the location of the road anomaly
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Road Location</Label>
            <div className="flex space-x-2">
              <Input
                id="location"
                placeholder="e.g. 123 Main Street, City"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={handleLocationSearch}
                variant="outline"
                className="shrink-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Location on Map</Label>
            <div className="map-container bg-gray-200 flex items-center justify-center">
              <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={12}
                  onLoad={() => setMapLoaded(true)}
                >
                  {mapLoaded && <Marker position={center} />}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>

          <div className="text-sm text-gray-500">
            <p>You can either type the location or pinpoint it precisely on the map.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationSection;
