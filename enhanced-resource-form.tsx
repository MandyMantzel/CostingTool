import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

export default function EnhancedResourceForm() {
  const [resourceType, setResourceType] = useState('accommodation');
  const [costType, setCostType] = useState('per-person');
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const getResourceNamePlaceholder = () => {
    switch(resourceType) {
      case 'accommodation':
        return "e.g. Nuqui lodge - Double rooms";
      case 'transportation':
        return "e.g. bus ticket, van rental, airport transfer";
      case 'personnel':
        return "e.g. trip leader, porter, local guide";
      case 'other-services':
        return "e.g. sunset cruise, yoga classes, zipline, etc.";
      case 'meals':
        return "e.g. breakfast, lunch, dinner, snacks";
      default:
        return "e.g. Mountain bike rental";
    }
  };

  const getQuantityPlaceholder = () => {
    if (resourceType === 'transportation' && !isBookingConfirmed && costType === 'per-person') {
      return "Pull current number of pax";
    }
    if (resourceType === 'personnel') {
      return "Calculated field";
    }
    return resourceType === 'accommodation' ? "Number of rooms" : "Number of items";
  };

  const getCapacityPlaceholder = () => {
    if (resourceType === 'personnel') {
      return "How many guests to each personnel";
    }
    return resourceType === 'accommodation' ? "Max. number of participants per room" : "Max. number of participants per item";
  };

  const getCostLabel = () => {
    switch(resourceType) {
      case 'accommodation':
        return "Cost per night";
      case 'meals':
        return "Total estimated meal cost per person";
      default:
        return "Cost per unit";
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Create a new resource</h2>
        <X className="cursor-pointer" size={20} />
      </div>

      <form>
        <div className="space-y-4">
          <div>
            <Label htmlFor="resourceType">Resource type</Label>
            <Select onValueChange={(value) => setResourceType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select resource type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accommodation">Accommodation</SelectItem>
                <SelectItem value="transportation">Transportation</SelectItem>
                <SelectItem value="personnel">Personnel</SelectItem>
                <SelectItem value="gear">Gear</SelectItem>
                <SelectItem value="other-services">Other services</SelectItem>
                <SelectItem value="meals">Meals</SelectItem>
                <SelectItem value="misc-fees">Misc fees</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="resourceName">Resource name</Label>
            <Input 
              id="resourceName" 
              placeholder={getResourceNamePlaceholder()} 
            />
          </div>

          <div>
            <Label htmlFor="supplierName">Supplier name</Label>
            <Input id="supplierName" placeholder="Enter supplier name" />
          </div>

          <div>
            <Label>Dates used</Label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Label htmlFor="dateFrom" className="sr-only">From</Label>
                <Input
                  id="dateFrom"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  placeholder="From"
                />
              </div>
              <div className="flex-1">
                <Label htmlFor="dateTo" className="sr-only">To</Label>
                <Input
                  id="dateTo"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  placeholder="To"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Input 
              id="quantity" 
              type="number" 
              placeholder={getQuantityPlaceholder()} 
              readOnly={resourceType === 'personnel'}
            />
          </div>

          <div>
            <Label htmlFor="capacity">Capacity</Label>
            <Input 
              id="capacity" 
              type="number" 
              placeholder={getCapacityPlaceholder()} 
            />
          </div>

          <div>
            <Label htmlFor="cost">{getCostLabel()}</Label>
            <Input id="cost" type="number" placeholder={`Enter ${getCostLabel().toLowerCase()}`} />
          </div>

          {resourceType === 'accommodation' ? (
            <div>
              <Label>Can this room be shared between participants from different bookings (dorm style)?</Label>
              <RadioGroup defaultValue="no" className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">No</Label>
                </div>
              </RadioGroup>
            </div>
          ) : (
            <div>
              <Label>Cost type</Label>
              <RadioGroup 
                defaultValue="per-person" 
                className="flex space-x-4 mt-2"
                onValueChange={(value) => setCostType(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="per-person" id="per-person" />
                  <Label htmlFor="per-person">Cost per person</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="per-group" id="per-group" />
                  <Label htmlFor="per-group">Cost per group</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="booking-confirmed" 
              onCheckedChange={(checked) => setIsBookingConfirmed(checked)}
            />
            <Label htmlFor="booking-confirmed">Booking confirmed?</Label>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </div>
      </form>
    </div>
  );
}
