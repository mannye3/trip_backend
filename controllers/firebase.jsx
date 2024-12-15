const saveTrips = async (tripData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.email) {
      throw new Error("User not authenticated");
    }

    const docId = `${Date.now()}`; // Adding prefix for better organization

    let parsedTripData;
    try {
      parsedTripData = JSON.parse(tripData);
      console.log(parsedTripData);
    } catch (error) {
      console.error("Error parsing trip data:", error);
      parsedTripData = tripData; // Use unparsed data if JSON parsing fails
    }

    const tripDoc = {
      userSelections: {
        location: formData.location || "",
        noOfDays: formData.noOfDays || "",
        budget: formData.budget || "",
        traveler: formData.traveler || "",
        activities: formData.activities || "",
      },
      tripData: parsedTripData,
      userEmail: user.email,
      id: docId,
      createdAt: new Date().toISOString(),
      status: "active",
    };

    const docRef = doc(db, "AITrips", docId);
    await setDoc(docRef, tripDoc);
    console.log("Document written with ID: ", docId);
    return docId;
  } catch (error) {
    console.error("Error saving trip:", error);
    throw error;
  }
};
