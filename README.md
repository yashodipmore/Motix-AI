# Motix AI - Machine Learning-Based Fault Diagnosis for Electric Drives

## 📌 Project Overview
**Motix AI** is an advanced fault diagnosis system that uses **Machine Learning (ML) and AI** to detect and predict faults in **AC electric drives**. By analyzing motor output data (such as voltage, current, and frequency), this system ensures early fault detection, reducing downtime and maintenance costs. The project integrates a **React-based frontend** with a **Django backend**, enabling real-time monitoring and fault analysis.

---

## 🎯 Core Features & Functionalities
✅ **Real-time Fault Detection** – ML models analyze sensor data and detect faults like over-voltage, under-voltage, short circuits, and overload conditions.  
✅ **Machine Learning Model** – Trained using **KNN, Random Forest, and SVM** to classify motor faults with high accuracy.  
✅ **Interactive Dashboard** – Built with **React.js**, it displays live motor health status, graphs, and alerts.  
✅ **REST API Integration** – The Django backend processes data and serves fault predictions via API endpoints.  
✅ **Historical Data Analysis** – Logs previous faults, timestamps, and severity levels for predictive maintenance.  
✅ **Alert Mechanism** – Sends real-time notifications for critical faults.  
✅ **User-friendly Interface** – Easy-to-use UI for engineers and technicians.  

---

## 🛠️ Current Work Progress
### ✅ **Frontend Development (Ongoing)**
- React-based dashboard UI development.
- Live graphs for motor health monitoring.
- API integration with the Django backend.

### ✅ **ML Model Training (Ongoing)**
- Dataset preprocessing (scaling, encoding, feature selection).
- Training and hyperparameter tuning (Grid Search, K-Fold CV).
- Model validation and optimization.

---

## 🔥 Core Concepts & Technologies Used
### **Frontend:**
- React.js, Next.js
- Tailwind CSS, Chart.js
- Axios (for API calls)

### **Backend:**
- Django REST Framework (API endpoints)
- FastAPI (for ML model serving)
- MongoDB (for fault logs and data storage)

### **Machine Learning:**
- scikit-learn (KNN, SVM, Random Forest)
- NumPy, Pandas (data processing)
- TensorFlow (for future deep learning implementation)

### **Hardware & Tools:**
- MATLAB/Simulink (motor fault simulations)
- Variable Frequency Drive (VFD) for real-world testing
- Sensors: Voltage, Current, and Temperature sensors

### **Software & Development Tools:**
- Visual Studio Code, PyCharm
- Docker (for deployment)
- Git & GitHub (for version control)
- Postman (API testing)

---

## 👨‍💻 Contributors & Specializations
| Name             | College                           | Role & Contribution |
|-----------------|---------------------------------|----------------------|
| **Komal Kumavat** | R.C. Patel Institute of Technology | ML Model Training & Research |
| **Jaykumar Girase** | R.C. Patel Institute of Technology | Backend Development & API Integration |
| **Yashodip More** | R.C. Patel Institute of Technology | Frontend Development & System Architecture |

---

## 🚀 How to Clone & Set Up the Project
### **Step 1: Clone the Repository**
```sh
 git clone https://github.com/your-username/motix-ai.git
 cd motix-ai
```

### **Step 2: Install Dependencies**
#### **For Backend (Django & ML Model)**
```sh
cd backend
pip install -r requirements.txt
```

#### **For Frontend (React.js Dashboard)**
```sh
cd frontend
npm install
```

### **Step 3: Run the Backend Server**
```sh
cd backend
python manage.py runserver
```

### **Step 4: Run the Frontend Application**
```sh
cd frontend
npm run dev
```

---

## 🏗️ Future Enhancements
🔹 Implement **Deep Learning models (LSTMs, CNNs)** for improved fault prediction.  
🔹 Add **multi-language support** for broader accessibility.  
🔹 Deploy the system using **AWS or Google Cloud**.  
🔹 Enhance fault alert mechanisms with **email & SMS notifications**.  

📌 *Stay tuned for updates!* 🚀
