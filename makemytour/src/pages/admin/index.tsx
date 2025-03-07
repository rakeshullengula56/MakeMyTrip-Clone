import { addFlight, addHotel, editHotel } from '@/api';
import FlightList from '@/components/Flights/FlightList';
import Hotel from '@/components/Hotels/Hotel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

import { availableMemory } from 'process'
import React, { useEffect, useState } from 'react'
const Flights = [
  {
    _id: "1",
    flightName: "Air India",
    from: "Delhi",
    to: "Chennai",
    departureTime: "2022-08-08T14:00:00.000Z",
    arrivalTime: "2022-08-08T16:00:00.000Z",
    price: 5000,
    availableSeats: 100
  },
  {
    _id: "2",
    flightName: "Air India",
    from: "Delhi",
    to: "Mumbai",
    departureTime: "2022-08-08T14:00:00.000Z",
    arrivalTime: "2022-08-08T16:00:00.000Z",
    price: 3000,
    availableSeats: 100
  },
  {
    _id: "3",
    flightName: "Air India",
    from: "Delhi",
    to: "Hyderabad",
    departureTime: "2022-08-08T14:00:00.000Z",
    arrivalTime: "2022-08-08T16:00:00.000Z",
    price: 4000,
    availableSeats: 100
  },
];
const Hotels = [
  {
    _id: "1",
    hotelName: "Hotel ABC",
    location: "Paris, France",
    pricePerNight: 5000,
    availableRooms: 100,
    amenties: "Pool, Gym, Spa"
  },
  {
    _id: "2",
    hotelName: "Hotel ABC",
    location: "Delhi",
    pricePerNight: 3000,
    availableRooms: 100,
    amenties: "Pool,AC, Gym, Spa"
  },
  {
    _id: "3",
    hotelName: "Hotel ABC",
    location: "Mumbai",
    pricePerNight: 4000,
    availableRooms: 10,
    amenties: "Pool,wifi, Gym, Spa"
  },
];
const index = () => {
  const [activeTab, setActiveTab] = useState("Flights")
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  return (
    <div className='container mx-auto p-4 bg-white max-w-full'>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-200 text-black">
          <TabsTrigger value="flights">Flights</TabsTrigger>
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <TabsContent value="flights">
          <Card>
            <CardHeader>
              <CardTitle>Manage Flights</CardTitle>
              <CardDescription>Add, Remove, Edit flights from System</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <FlightList onSelect={setSelectedFlight}></FlightList>
                <AddEditFlight flight={selectedFlight}></AddEditFlight>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='hotels'>
          <Card>
            <CardHeader>
              <CardTitle>Manage Hotels</CardTitle>
              <CardDescription>Add, Remove, Edit hotels from System</CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-2 gap-4'>
                <Hotel onSelect={selectedHotel}></Hotel>
                <AddEditHotel hotel={selectedHotel}></AddEditHotel>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='users'>
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Search user by Email</CardDescription>
            </CardHeader>
            <CardContent>
              <UserSearch />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default index
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phoneNumber: string;
}

function UserSearch() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const sampleUser: any = {
      _id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      role: "USER",
      phoneNumber: "1234567890",
    };
    setUser(sampleUser);
  };
  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="email" className="sr-only">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Search user by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
      {user && (
        <div className="border p-4 rounded-md">
          <h3 className="font-bold mb-2">User Details</h3>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
          <p>
            <strong>Phone:</strong> {user.phoneNumber}
          </p>
        </div>
      )}
    </div>
  );
}

function AddEditHotel({ hotel }: { hotel: any }) {
  const [formData, setFormData] = useState({
    hotelName: "",
    location: "",
    pricePerNight: 0,
    availableRooms: 0,
    amenities: "",
  });

  useEffect(() => {
    if (hotel) {
      setFormData(hotel);
    } else {
      setFormData({
        hotelName: "",
        location: "",
        pricePerNight: 0,
        availableRooms: 0,
        amenities: "",
      });
    }
  }, [hotel]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hotel) {
      await editHotel(
        hotel.id,
        formData.hotelName,
        formData.location,
        formData.pricePerNight,
        formData.availableRooms,
        formData.amenities
      );
      return;
    }
    await addHotel(
      formData.hotelName,
      formData.location,
      formData.pricePerNight,
      formData.availableRooms,
      formData.amenities
    );
    if (!hotel) {
      setFormData({
        hotelName: "",
        location: "",
        pricePerNight: 0,
        availableRooms: 0,
        amenities: "",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold mb-2">
        {hotel ? "Edit Hotel" : "Add New Hotel"}
      </h3>
      <div>
        <Label htmlFor="hotelName">Hotel Name</Label>
        <Input
          id="hotelName"
          name="hotelName"
          value={formData.hotelName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="pricePerNight">Price Per Night</Label>
        <Input
          id="pricePerNight"
          name="pricePerNight"
          type="number"
          value={formData.pricePerNight}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="availableRooms">Available Rooms</Label>
        <Input
          id="availableRooms"
          name="availableRooms"
          type="number"
          value={formData.availableRooms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="amenities">Amenities</Label>
        <Textarea
          id="amenities"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">{hotel ? "Update Hotel" : "Add Hotel"}</Button>
    </form>
  );
}

function AddEditFlight({ flight }: any) {
  const [formData, setFormData] = useState({
    _id: "",
    flightName: "",
    from: "",
    to: "",
    departureTime: "",
    arrivalTime: "",
    price: 0,
    availableSeats: 0
  });
  useEffect(() => {
    if (flight) {
      setFormData(flight);
    } else {
      setFormData({
        _id: "",
        flightName: "",
        from: "",
        to: "",
        departureTime: "",
        arrivalTime: "",
        price: 0,
        availableSeats: 0
      });
    };
  }, [flight]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,  // ✅ Convert to number for numeric inputs
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form data :", formData);
    await addFlight(formData.flightName, formData.from, formData.to, formData.departureTime, formData.arrivalTime, formData.price, formData.availableSeats);
  };
  return (
    <form onSubmit={handleSubmit} className='space-y-4' >
      <h3 className='text-lg font semibold mb-2'>{flight ? "Edit Flight" : "Add New Flight"}</h3>
      <div>
        <Label htmlFor="flightName">Flight Name</Label>
        <Input id="flightName" name="flightName" value={formData.flightName} onChange={handleChange} required></Input>
      </div>
      <div>
        <Label htmlFor="from">From</Label>
        <Input id="from" name='from' value={formData.from} onChange={handleChange} required></Input>
      </div>
      <div>
        <Label htmlFor="to">To</Label>
        <Input id="to" name='to' value={formData.to} onChange={handleChange} required></Input>
      </div>
      <div>
        <Label htmlFor="departureTime">Departure Time</Label>
        <Input id="departureTime" name='departureTime' type='datetime-local' value={formData.departureTime} onChange={handleChange} required></Input>
      </div>
      <div>
        <Label htmlFor="arrivalTime">Arrival Time</Label>
        <Input id="arrivalTime" name='arrivalTime' type='datetime-local' value={formData.arrivalTime} onChange={handleChange} required></Input>
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input id="price" name="price" type='number' value={formData.price} onChange={handleChange} required></Input>
      </div>
      <div>
        <Label htmlFor="availableSeats">Available Seats</Label>
        <Input id="availableSeats" type='number' name='availableSeats' value={formData.availableSeats} onChange={handleChange} required></Input>
      </div>
      <div>
        <Button type="submit">{flight ? "Upgrade Flight" : "Add Flight"}</Button>
      </div>

    </form>
  )


}
