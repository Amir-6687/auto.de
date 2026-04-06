// "use client";

// import { useState } from "react";
// import { Combobox } from "@/components/ui/combobox";

// const carBrands = [
//   { value: "toyota", label: "Toyota" },
//   { value: "benz", label: "Mercedes-Benz" },
//   { value: "bmw", label: "BMW" },
//   { value: "honda", label: "Honda" },
//   { value: "ford", label: "Ford" },
//   { value: "audi", label: "Audi" },
//   { value: "hyundai", label: "Hyundai" },
//   { value: "kia", label: "Kia" },
//   { value: "volkswagen", label: "Volkswagen" },
//   { value: "porsche", label: "Porsche" },
// ];

// function HeroSection() {
//   const [selectedCar, setSelectedCar] = useState("");

//   return (
//     <div className="h-[70vh] flex flex-col justify-center items-center text-center text-white px-6">
//       <h2 className="text-4xl sm:text-6xl font-bold mb-4">
//         Find Your Perfect Car
//       </h2>

//       <p className="text-lg sm:text-xl max-w-2xl mb-8">
//         Explore thousands of listings with advanced filters and real-time updates.
//       </p>

//       <div className="w-full flex justify-center">
//       <div className="w-[50%] rounded-lg bg-black/40 backdrop-blur-md px-2 py-1">

//     <Combobox
//       placeholder="Search..."
//       value={selectedCar}
//       onChange={setSelectedCar}
//       size="large"
//       errored
//     >
//       <Combobox.Input />
//       <Combobox.List emptyMessage="No brand found">
//         {carBrands.map((car) => (
//           <Combobox.Option key={car.value} value={car.value}>
//             {car.label}
//           </Combobox.Option>
//         ))}
//       </Combobox.List>
//     </Combobox>
//   </div>
// </div>

//     </div>
//   );
// }

// export default HeroSection;

"use client";

import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";

const carBrands = [
  { value: "toyota", label: "Toyota" },
  { value: "benz", label: "Mercedes-Benz" },
  { value: "bmw", label: "BMW" },
  { value: "honda", label: "Honda" },
  { value: "ford", label: "Ford" },
  { value: "audi", label: "Audi" },
  { value: "hyundai", label: "Hyundai" },
  { value: "kia", label: "Kia" },
  { value: "volkswagen", label: "Volkswagen" },
  { value: "porsche", label: "Porsche" },
];

function HeroSection() {
  const [selectedCar, setSelectedCar] = useState("");

  return (
    <div className="h-[70vh] flex flex-col justify-center items-center text-center text-white px-6">
      <h2 className="text-4xl sm:text-6xl font-bold mb-4">
        Find Your Perfect Car
      </h2>

      <p className="text-lg sm:text-xl max-w-2xl mb-8">
        Explore thousands of listings with advanced filters and real-time updates.
      </p>

      <div className="w-full flex justify-center">
        <div className="w-[50%] rounded-lg bg-black/40 backdrop-blur-md px-2 py-1">
          <Combobox
            placeholder="Search..."
            value={selectedCar}
            onChange={setSelectedCar}
            size="large"
            errored
          >
            <Combobox.Input />
            <Combobox.List emptyMessage="No brand found">
              {carBrands.map((car) => (
                <Combobox.Option key={car.value} value={car.value}>
                  {car.label}
                </Combobox.Option>
              ))}
            </Combobox.List>
          </Combobox>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;