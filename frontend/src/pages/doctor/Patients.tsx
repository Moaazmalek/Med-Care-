/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, User, Activity } from "lucide-react";
import type { AppDispatch, RootState } from "@/redux/store";
import { fetchDoctorPatients } from "@/redux/slices/doctorSlice";
import MyLoader from "@/components/Global/MyLoader";
import uploadArea from "@/assets/upload_area.svg";

export const Patients = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { patients, loading } = useSelector((state: RootState) => state.doctor);

  useEffect(() => {
    if (!patients.length) {
      dispatch(fetchDoctorPatients());
    }
  }, [dispatch, patients]);

  if (loading) {
    return <MyLoader />;
  }

  if (!patients.length) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No patients found.
      </p>
    );
  }

  return (
    <div className="space-y-6 mt-8">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold">
            My Patients
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {patients.map((patientItem: any, index: number) => {
          const patient = patientItem.patient;

          

          return (
            <Card
              key={patient._id || index}
              className="hover:shadow-lg transition-shadow duration-200"
            >
              <CardContent className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-500">
                    #{index + 1}
                  </span>
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <Activity size={14} /> {patientItem.totalVisits || 0} visits
                  </span>
                </div>

                {/* Patient Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={patient.image || uploadArea}
                    alt={patient.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <User size={14} /> Patient
                    </p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="flex flex-col gap-2 text-sm text-gray-600 mt-2">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>
                      Last Visit: {patientItem.lastVisit || "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    <span>{patient.phone || "No phone"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>Age: {patient.age || "N/A"}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Patients;
