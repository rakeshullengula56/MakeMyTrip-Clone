import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { getFlight } from '@/api';
import Loader from '../Loader';
const FlightList = ({ onSelect }: any) => {
    const [flight, setFlight] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const data = await getFlight()
                setFlight(data);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchFlights();
    }, [])
    if (loading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <h3 className='text-lg font-semibold mb-2'>Flights List</h3>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Flight Name</TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {flight.length > 0 ? (flight.map((flight: any) => (
                        <TableRow key={flight._id}>
                            <TableCell>{flight.flightName}</TableCell>
                            <TableCell>{flight.from}</TableCell>
                            <TableCell>{flight.to}</TableCell>
                            <TableCell>
                                <Button onClick={() => onSelect(flight)}>Edit</Button>
                            </TableCell>
                        </TableRow>))) : (<TableRow><TableCell>No Data</TableCell></TableRow>)
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default FlightList
