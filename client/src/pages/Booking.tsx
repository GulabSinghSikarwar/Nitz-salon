import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useServices, useStaff, useCreateBooking } from "@/hooks/use-salon";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { insertBookingSchema } from "@shared/schema";
import { useState } from "react";
import { format } from "date-fns";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Calendar as CalendarIcon, User, Scissors, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const steps = [
  { id: 1, name: "Service" },
  { id: 2, name: "Staff" },
  { id: 3, name: "Time" },
  { id: 4, name: "Details" },
];

export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const preSelectedServiceId = searchParams.get("service") ? parseInt(searchParams.get("service")!) : undefined;

  const { data: services } = useServices();
  const { data: staff } = useStaff();
  const createBooking = useCreateBooking();

  const form = useForm({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      serviceId: preSelectedServiceId,
      staffId: undefined,
      date: "",
      time: "",
      name: "",
      email: "",
      phone: "",
    },
  });

  const nextStep = async () => {
    // Validate current step fields before proceeding
    let fieldsToValidate: any[] = [];
    if (currentStep === 1) fieldsToValidate = ["serviceId"];
    if (currentStep === 2) fieldsToValidate = ["staffId"];
    if (currentStep === 3) fieldsToValidate = ["date", "time"];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = (data: z.infer<typeof insertBookingSchema>) => {
    createBooking.mutate(data, {
      onSuccess: () => {
        // Show success state or redirect
        setCurrentStep(5); // 5 = success
      },
    });
  };

  // Time slots (mock)
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-12 bg-muted/20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Book Your Appointment</h1>
          <p className="text-muted-foreground">Follow the steps below to schedule your visit.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {currentStep < 5 && (
          <div className="mb-12">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 w-full h-0.5 bg-muted -z-10" />
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2 bg-background px-2">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 border-2",
                    currentStep >= step.id 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : "bg-background border-muted text-muted-foreground"
                  )}>
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={cn("text-xs font-medium uppercase tracking-wide", currentStep >= step.id ? "text-primary" : "text-muted-foreground")}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-card shadow-xl rounded-3xl border border-border/50 overflow-hidden min-h-[500px] flex flex-col">
          {currentStep === 5 ? (
             <div className="flex flex-col items-center justify-center h-full p-12 text-center flex-grow">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                 <Check className="w-10 h-10" />
               </div>
               <h2 className="text-3xl font-display font-bold mb-4">Booking Confirmed!</h2>
               <p className="text-muted-foreground mb-8 max-w-md">
                 Your appointment request has been received. We will send a confirmation email to {form.getValues("email")} shortly.
               </p>
               <Button onClick={() => window.location.href = '/'} className="rounded-full px-8 bg-primary hover:bg-primary/90">
                 Return Home
               </Button>
             </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-grow">
              <div className="p-8 md:p-12 flex-grow">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold font-display">Select a Service</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Controller
                          control={form.control}
                          name="serviceId"
                          render={({ field }) => (
                            <>
                              {services?.map((service) => (
                                <div
                                  key={service.id}
                                  onClick={() => field.onChange(service.id)}
                                  className={cn(
                                    "p-6 rounded-2xl border-2 cursor-pointer transition-all hover:border-primary/50 flex items-start gap-4",
                                    field.value === service.id ? "border-primary bg-primary/5" : "border-muted bg-card"
                                  )}
                                >
                                  <div className={cn("p-2 rounded-full", field.value === service.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                                    <Scissors className="w-5 h-5" />
                                  </div>
                                  <div className="flex-grow">
                                    <div className="flex justify-between">
                                      <h3 className="font-bold">{service.name}</h3>
                                      <span className="font-medium text-primary">{service.price}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{service.description}</p>
                                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary/50" /> 
                                      {service.duration}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        />
                      </div>
                      {form.formState.errors.serviceId && <p className="text-destructive text-sm">Please select a service</p>}
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold font-display">Select a Stylist</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Controller
                          control={form.control}
                          name="staffId"
                          render={({ field }) => (
                            <>
                              <div
                                onClick={() => field.onChange(undefined)} // Or handle "Any Staff" logic
                                className={cn(
                                  "p-6 rounded-2xl border-2 cursor-pointer transition-all text-center flex flex-col items-center justify-center gap-4 h-full",
                                  !field.value ? "border-primary bg-primary/5" : "border-muted bg-card hover:border-primary/30"
                                )}
                              >
                                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                                  <User className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="font-bold">Any Available Professional</h3>
                              </div>

                              {staff?.map((member) => (
                                <div
                                  key={member.id}
                                  onClick={() => field.onChange(member.id)}
                                  className={cn(
                                    "p-6 rounded-2xl border-2 cursor-pointer transition-all text-center flex flex-col items-center gap-4",
                                    field.value === member.id ? "border-primary bg-primary/5" : "border-muted bg-card hover:border-primary/30"
                                  )}
                                >
                                  <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="w-20 h-20 rounded-full object-cover border-2 border-background shadow-md"
                                  />
                                  <div>
                                    <h3 className="font-bold">{member.name}</h3>
                                    <p className="text-xs text-muted-foreground uppercase">{member.role}</p>
                                  </div>
                                </div>
                              ))}
                            </>
                          )}
                        />
                      </div>
                      {form.formState.errors.staffId && <p className="text-destructive text-sm">Please select a stylist</p>}
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-8"
                    >
                      <h2 className="text-2xl font-bold font-display">Select Date & Time</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="flex justify-center md:justify-start">
                          <Controller
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                              <Calendar
                                mode="single"
                                selected={field.value ? new Date(field.value) : undefined}
                                onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates & Sundays
                                className="rounded-xl border shadow-sm p-4"
                              />
                            )}
                          />
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-4 flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" /> Available Slots
                          </h3>
                          <Controller
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                              <div className="grid grid-cols-3 gap-3">
                                {timeSlots.map((time) => (
                                  <Button
                                    key={time}
                                    type="button"
                                    variant={field.value === time ? "default" : "outline"}
                                    onClick={() => field.onChange(time)}
                                    className={cn(
                                      "w-full",
                                      field.value === time && "bg-primary hover:bg-primary/90"
                                    )}
                                  >
                                    {time}
                                  </Button>
                                ))}
                              </div>
                            )}
                          />
                          {(form.formState.errors.date || form.formState.errors.time) && (
                            <p className="text-destructive text-sm mt-4">Please select both date and time</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h2 className="text-2xl font-bold font-display">Your Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Full Name</label>
                          <Input 
                            {...form.register("name")}
                            className="h-12 rounded-xl"
                            placeholder="Jane Doe"
                          />
                          {form.formState.errors.name && <p className="text-destructive text-xs">{form.formState.errors.name.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone Number</label>
                          <Input 
                            {...form.register("phone")}
                            className="h-12 rounded-xl"
                            placeholder="(555) 123-4567"
                          />
                          {form.formState.errors.phone && <p className="text-destructive text-xs">{form.formState.errors.phone.message}</p>}
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <label className="text-sm font-medium">Email Address</label>
                          <Input 
                            {...form.register("email")}
                            type="email"
                            className="h-12 rounded-xl"
                            placeholder="jane@example.com"
                          />
                          {form.formState.errors.email && <p className="text-destructive text-xs">{form.formState.errors.email.message}</p>}
                        </div>
                      </div>

                      <div className="bg-muted/30 p-6 rounded-xl border border-border/50 mt-8">
                        <h3 className="font-bold mb-4">Booking Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Service:</span>
                            <span className="font-medium">{services?.find(s => s.id === form.getValues("serviceId"))?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Stylist:</span>
                            <span className="font-medium">
                              {form.getValues("staffId") 
                                ? staff?.find(s => s.id === form.getValues("staffId"))?.name 
                                : "Any Available Stylist"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date & Time:</span>
                            <span className="font-medium">{form.getValues("date")} at {form.getValues("time")}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-8 border-t border-border/40 bg-muted/10 flex justify-between items-center rounded-b-3xl">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="hover:bg-muted"
                >
                  Back
                </Button>
                
                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep} className="bg-primary hover:bg-primary/90 px-8 rounded-full">
                    Next Step
                  </Button>
                ) : (
                  <Button type="submit" disabled={createBooking.isPending} className="bg-primary hover:bg-primary/90 px-8 rounded-full shadow-lg shadow-primary/25">
                    {createBooking.isPending ? "Confirming..." : "Confirm Booking"}
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
