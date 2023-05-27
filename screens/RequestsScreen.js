import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const RequestCard = ({ request }) => {
  const firstName = request.riderName.split(" ")[0];

  return (
    <View style={tw`bg-white rounded-sm p-4 mb-4 pb-2`}>
      <View style={tw`flex-row justify-between items-center `}>
        <View style={tw`flex-row items-center`}>
          <Image
            style={tw`w-10 h-10 rounded-full mr-2`}
            source={{ uri: request.riderAvatar }}
          />
          <Text style={tw`text-lg font-bold pl-2`}>{firstName}</Text>
        </View>
        <View>
          <Text style={tw`text-lg font-bold`}>Kshs {request.price}</Text>
          <Text style={tw`text-sm text-gray-500`}>{request.distance} km</Text>
        </View>
      </View>

      <View style={tw`p-2`}>
        <Text style={tw`text-sm font-bold text-gray-300`}>PICK UP</Text>
        <Text style={tw`text-lg`}>{request.pickup}</Text>
      </View>

      <View style={tw`p-2`}>
        <Text style={tw`text-sm font-bold text-gray-300`}>DROP OFF</Text>
        <Text style={tw`text-lg`}>{request.dropoff}</Text>
      </View>

      <TouchableOpacity style={tw`bg-black rounded-sm p-2 mt-4`}>
        <Text style={tw`text-center text-white font-bold`}>Accept Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const RequestsScreen = ({ navigation }) => {
  const [driver, setDriver] = useState({
    isOnline: false,
    driverId: "58674001",
    driverName: "Muiruri Kabera",
    driverPhone: "+254790485731",
    carMake: "Toyota",
    carModel: "Vitz",
    licensePlate: "KDB 754D",
    rating: "4.7",
    isAvailable: true,
  });

  /*
  const requests = [
    // Fill this with actual data
    {
      riderName: "Vivica Gathoni",
      price: "390",
      distance: "25",
      pickup: "Thika Road Mall",
      dropoff: "Tabby House, Thika",
    },
    {
      riderName: "John Njau",
      price: "510",
      distance: "10",
      pickup: "ABC Place",
      dropoff: "Imara Daima Mall",
    },
    {
      riderName: "Steve Mbatia",
      price: "1290",
      distance: "17.5",
      pickup: "Pizza Inn, Kahawa Sukari",
      dropoff: "TRM, Thika Road",
    },
    {
      riderName: "Diana Nyakonyu",
      price: "485",
      distance: "12",
      pickup: "ABC Place, Westlands",
      dropoff: "Copper Ivy, Ojijo Road",
    },
    // ... more requests ...
  ];
*/
  const [requests, setRequests] = useState([]);

  const handleToggleStatus = () => {
    // Toggle driver status here
    setDriver((prevDriver) => ({
      ...prevDriver,
      isOnline: !prevDriver.isOnline,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=10");
        const data = await response.json();
        const fetchedRequests = data.results.map((user) => {
          return {
            riderName: user.name.first + " " + user.name.last,
            price: (Math.random() * 1000).toFixed(2),
            distance: (Math.random() * 100).toFixed(2),
            pickup: "TRM Drive, Thika Road",
            dropoff: "Tabby House, Thika",
            riderAvatar: user.picture.medium,
          };
        });
        setRequests(fetchedRequests);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // You can handle side effects here, for example,
    // send the new status to the backend or update the local storage.
    // console.log("Driver status changed", driver.isOnline);
  }, [driver.isOnline]);

  return (
    <SafeAreaView style={tw`pt-10 flex-1`}>
      <View style={tw`flex-row items-center justify-between mb-5 px-6`}>
        <TouchableOpacity onPress={() => navigation.navigate("MenuScreen")}>
          <Icon type="ionicon" name="menu-outline" color="black" size={24} />
        </TouchableOpacity>
        <Text style={tw`font-bold text-base`}>
          {driver.isOnline ? "Online" : "Offline"}
        </Text>
        <TouchableOpacity onPress={handleToggleStatus}>
          <Icon
            type="font-awesome"
            name={driver.isOnline ? "toggle-on" : "toggle-off"}
            color="black"
            size={24}
          />
        </TouchableOpacity>
      </View>

      <View
        style={tw`${driver.isOnline ? "bg-yellow-500" : "bg-gray-500"} p-4`}
      >
        {driver.isOnline ? (
          <Text style={tw`text-black font-bold`}>
            You have 10 new requests.
          </Text>
        ) : (
          <View style={tw`flex-row items-center`}>
            <Icon type="ionicon" name="moon-outline" color="white" size={24} />
            <View style={tw`pl-2`}>
              <Text style={tw`text-white font-bold`}>You are offline !</Text>
              <Text style={tw`text-white`}>
                Go online to start accepting jobs.
              </Text>
            </View>
          </View>
        )}
      </View>

      <FlatList
        data={requests}
        renderItem={({ item }) => <RequestCard request={item} />}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={tw`p-4`}
      />
    </SafeAreaView>
  );
};

export default RequestsScreen;
