import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Dashboard({ navigation }) {
  const [income, setIncome] = useState(5000); // Example income value
  const [expenses, setExpenses] = useState(3000); // Example expenses value
  const [savings, setSavings] = useState(income - expenses); // Calculate savings
  const [showInputModal, setShowInputModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryAmount, setCategoryAmount] = useState('');

  const categories = [
    { name: 'House', icon: 'home' },
    { name: 'Transport', icon: 'car' },
    { name: 'Education', icon: 'school' },
    { name: 'Utilities', icon: 'water' },
    { name: 'Subscription', icon: 'card' },
    { name: 'Others', icon: 'ellipse' },
  ];

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowInputModal(true);
  };

  const handleSaveAmount = () => {
    console.log(`Category: ${selectedCategory.name}, Amount: ${categoryAmount}`);
    setShowInputModal(false);
    setCategoryAmount('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image source={{ uri: 'https://your-image-url.com' }} style={styles.profileImage} />
        <Text style={styles.username}>{`Welcome`}</Text>
      </View>

      {/* Income and Expense Bar */}
      <View style={styles.incomeExpenseBar}>
        <TouchableOpacity style={[styles.incomeExpenseItem, styles.incomeItem]}>
          <Text style={styles.incomeExpenseText}>Income</Text>
          <Text style={styles.amountText}>${income}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.incomeExpenseItem, styles.expenseItem]}>
          <Text style={styles.incomeExpenseText}>Expense</Text>
          <Text style={styles.amountText}>${expenses}</Text>
        </TouchableOpacity>
      </View>

      {/* Savings for the Month */}
      <View style={styles.savingsContainer}>
        <Text style={styles.savingsTitle}>Savings for the Month</Text>
        <Text style={styles.savingsAmount}>${savings}</Text>
        <View style={styles.savingsDetails}>
          <Text style={styles.detailsText}>Earned: ${income}</Text>
          <Text style={styles.detailsText}>Spent: ${expenses}</Text>
        </View>
      </View>

      {/* Monthly Budget Section */}
      <Text style={styles.subheading}>Monthly Budget</Text>
      <View style={styles.budgetCategories}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.name}
            style={styles.budgetItem}
            onPress={() => handleCategoryClick(category)}
          >
            <Icon name={category.icon} size={30} color="#fff" style={styles.budgetIcon} />
            <Text style={styles.budgetText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input Modal for Category Amount */}
      <Modal
        visible={showInputModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowInputModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{`Enter Amount for ${selectedCategory?.name}`}</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Amount"
              keyboardType="numeric"
              value={categoryAmount}
              onChangeText={setCategoryAmount}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAmount}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowInputModal(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Menu Bar */}
      <View style={styles.menuBar}>
        {['home', 'graph', 'settings', 'profile'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={styles.menuItem}
            onPress={() => navigation.navigate(tab.charAt(0).toUpperCase() + tab.slice(1))}
          >
            <Icon
              name={
                tab === 'home'
                  ? 'home'
                  : tab === 'graph'
                  ? 'stats-chart'
                  : tab === 'settings'
                  ? 'settings'
                  : 'person'
              }
              size={24}
              color="#fff"
            />
            <Text style={styles.menuText}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F1FF',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  incomeExpenseBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  incomeExpenseItem: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    borderRadius: 8,
  },
  incomeItem: {
    backgroundColor: '#4CAF50',
  },
  expenseItem: {
    backgroundColor: '#F44336',
  },
  incomeExpenseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  savingsContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  savingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  savingsAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  savingsDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsText: {
    fontSize: 16,
    color: '#666',
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  budgetCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  budgetItem: {
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
  },
  budgetIcon: {
    marginBottom: 5,
  },
  budgetText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  inputField: {
    width: '100%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    padding: 10,
    marginTop: 10,
    backgroundColor: '#F44336',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  menuBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#D81B60',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    color: '#fff',
    fontSize: 12,
  },
});
