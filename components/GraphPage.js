import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Importing chart library
import { Calendar } from 'react-native-calendars'; // Import the Calendar component
import Icon from 'react-native-vector-icons/Ionicons';

const GraphPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [graphData, setGraphData] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false); // State to toggle calendar visibility
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Default selected date

  // Simulate fetching data
  useEffect(() => {
    setTimeout(() => {
      setGraphData({
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            data: [20, 45, 28, 80],
          },
        ],
      });
      setIsLoading(false);
    }, 2000); // Simulate a delay for fetching data
  }, []);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString); // Set the selected date
    setIsCalendarVisible(false); // Close the calendar after selecting a date
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : graphData ? (
        <View style={styles.graphContainer}>
          <Text style={styles.title}>Sales Data</Text>
          <LineChart
            data={graphData}
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
          />
        </View>
      ) : (
        <Text>No data available for the graph.</Text>
      )}

      {/* Calendar Section */}
      <View style={styles.calendarSection}>
        <TouchableOpacity onPress={() => setIsCalendarVisible(true)} style={styles.calendarButton}>
          <Icon name="calendar" size={30} color="#333" />
          <Text style={styles.calendarText}>Select Date</Text>
        </TouchableOpacity>

        {/* Full Calendar Modal */}
        {isCalendarVisible && (
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>
                {months[new Date(selectedDate).getMonth()]} {new Date(selectedDate).getFullYear()}
              </Text>

              <Calendar
                markedDates={{
                  [selectedDate]: { selected: true, selectedColor: '#4CAF50' },
                }}
                onDayPress={handleDayPress}
                monthFormat={'yyyy MM'}
              />

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setIsCalendarVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F1FF',
  },
  graphContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendarSection: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
  },
  calendarText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GraphPage;
