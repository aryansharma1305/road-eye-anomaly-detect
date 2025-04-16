
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';

const LocationSection: React.FC = () => {
  const [location, setLocation] = useState<string>('');
  
  // Placeholder for when we connect to a real map API
  const handleLocationSearch = () => {
    console.log("Searching for location:", location);
    // This would typically interact with a map API
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
              <div className="text-center text-gray-500 p-6">
                <MapPin className="h-10 w-10 mx-auto mb-2 text-roadapp-purple opacity-40" />
                <p className="text-sm font-medium">Interactive map will be displayed here</p>
                <p className="text-xs mt-1">Please enter a location above to view on map</p>
              </div>
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
