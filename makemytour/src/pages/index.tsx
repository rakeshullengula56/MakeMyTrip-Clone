import SignupDialog from "@/components/SignupDialog";
import {Plane} from "lucide-react";
export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80")',
      }}
    >
      <div className="min-h-screen bg-gradient-to-b from-black/50 to-blue-900/50 backdrop-blur-[2px]">
        <header className="bg-black/20 backdrop-blur-md p-4 py-sticky-top-0 z-50">
          <div className="container mx-auto px-4 flex items-center justify-between text-white">
            <div className="flex items-center space-x-2 text-white">
              <Plane className="w-8 h-8 text-red-500"/>
              <span className="text-2xl font-bold">MakeMyTrip</span>
            </div>
            <div className="flex items-center space-x-4 ">
              <SignupDialog />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

