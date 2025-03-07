import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "../ui/button";
  import { useEffect, useState } from "react";
  import { getHotel } from "@/api";
  import Loader from "../Loader";
  
  const HotelList = ({ onSelect }: any) => {
    const [hotel, setHotel] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchhotel = async () => {
        try {
          const data = await getHotel();
          setHotel(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchhotel();
    }, []);
    
    if (loading) {
      return <Loader />;
    }
    return (
      <div>
        <h3 className="text-lg font-semibold mb-2">Hotel List</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hotel Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Price/Night</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotel.length > 0 ? (
              hotel.map((hotel: any) => (
                <TableRow key={hotel._id}>
                  <TableCell>{hotel.hotelName}</TableCell>
                  <TableCell>{hotel.location}</TableCell>
                  <TableCell>${hotel.pricePerNight}</TableCell>
                  <TableCell>
                    <Button onClick={() => onSelect(hotel)}>Edit</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  };
  export default HotelList;
