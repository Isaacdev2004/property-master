import { useQuery } from "@tanstack/react-query";
import { adminFetch } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Booking } from "@shared/schema";

export default function AdminBookings() {
  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: ["/api/admin/bookings"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/bookings");
      return res.json();
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-500 mt-1">View service booking requests</p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            No bookings found
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id} data-testid={`booking-card-${booking.id}`}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-lg">{booking.fullName}</CardTitle>
                    <p className="text-sm text-gray-500">{booking.email}</p>
                  </div>
                  <Badge className={getStatusColor(booking.status)}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Service</p>
                    <p className="font-medium">{booking.serviceType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{booking.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-medium">{booking.preferredDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time</p>
                    <p className="font-medium">{booking.preferredTime}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t grid sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium">{booking.address}, {booking.city}</p>
                  </div>
                  {booking.message && (
                    <div>
                      <p className="text-gray-500">Notes</p>
                      <p className="font-medium">{booking.message}</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 pt-4 border-t text-xs text-gray-400">
                  Submitted: {new Date(booking.createdAt).toLocaleString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
