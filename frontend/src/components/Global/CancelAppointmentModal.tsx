'use client'
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { cancelAppointment } from '@/redux/slices/appointmentSlice';

interface CancelAppointmentModalProps {
  appointmentId: string;
}

export const CancelAppointmentModal = ({ appointmentId }: CancelAppointmentModalProps) => {

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch<AppDispatch>();

  const handleCancel = async () => {
    setLoading(true);
    try {
      await dispatch(cancelAppointment(appointmentId)).unwrap();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert('Failed to cancel appointment');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Cancel Appointment</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Cancellation</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to cancel this appointment?</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={loading}
          >
            {loading ? 'Cancelling...' : 'Okay'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
