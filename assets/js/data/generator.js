/**
 * Demo Data Generator
 * Generates realistic demo data for the HMS
 */
class DemoDataGenerator {
    constructor(storage) {
        this.storage = storage;
    }

    /**
     * Check if demo data is already initialized
     */
    isInitialized() {
        return localStorage.getItem('hms_demo_initialized') === 'true';
    }

    /**
     * Generate all demo data
     */
    generateAll() {
        if (this.isInitialized()) {
            console.log('✓ Demo data already initialized');
            return;
        }

        console.log('Generating demo data...');

        this.generateUsers();
        this.generatePatients(50);
        this.generateDrugs();
        this.generateLabTests();
        this.generateVisits(30);
        this.generatePrescriptions(20);
        this.generateLabRequests(15);
        this.generateBills(25);
        this.generateQueue(5);

        localStorage.setItem('hms_demo_initialized', 'true');
        console.log('✓ Demo data generation complete!');
    }

    /**
     * Reset all demo data
     */
    reset() {
        this.storage.clearAll();
        localStorage.removeItem('hms_demo_initialized');
        this.generateAll();
    }

    /**
     * Generate system users
     */
    generateUsers() {
        const users = [
            {
                id: 'ADMIN-001',
                username: 'admin',
                password: 'admin123',
                role: 'Administrator',
                name: 'Admin User',
                email: 'admin@hospital.com',
                phone: '+254700000001'
            },
            {
                id: 'DOC-001',
                username: 'doctor',
                password: 'doctor123',
                role: 'Doctor',
                name: 'Dr. Sarah Kimani',
                specialization: 'General Practitioner',
                email: 'sarah.kimani@hospital.com',
                phone: '+254700000002'
            },
            {
                id: 'NURSE-001',
                username: 'nurse',
                password: 'nurse123',
                role: 'Nurse',
                name: 'Nurse Mary Wanjiku',
                email: 'mary.wanjiku@hospital.com',
                phone: '+254700000003'
            },
            {
                id: 'PHARM-001',
                username: 'pharmacist',
                password: 'pharma123',
                role: 'Pharmacist',
                name: 'John Mwangi',
                email: 'john.mwangi@hospital.com',
                phone: '+254700000004'
            },
            {
                id: 'LAB-001',
                username: 'lab',
                password: 'lab123',
                role: 'Lab Technician',
                name: 'Peter Omondi',
                email: 'peter.omondi@hospital.com',
                phone: '+254700000005'
            },
            {
                id: 'RECEPTION-001',
                username: 'reception',
                password: 'reception123',
                role: 'Receptionist',
                name: 'Grace Akinyi',
                email: 'grace.akinyi@hospital.com',
                phone: '+254700000006'
            }
        ];

        users.forEach(user => this.storage.add('users', user));
    }

    /**
     * Generate patients
     */
    generatePatients(count) {
        const firstNames = {
            Male: ['John', 'Peter', 'James', 'David', 'Michael', 'Joseph', 'Daniel', 'Samuel', 'Brian', 'Kevin'],
            Female: ['Mary', 'Sarah', 'Grace', 'Jane', 'Lucy', 'Faith', 'Ruth', 'Esther', 'Ann', 'Joyce']
        };

        const lastNames = ['Kamau', 'Wanjiku', 'Omondi', 'Akinyi', 'Mwangi', 'Njeri', 'Otieno', 'Wambui', 'Kipchoge', 'Mutua'];
        const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
        const allergies = ['Penicillin', 'Sulfa drugs', 'Aspirin', 'Ibuprofen', 'Latex', 'Peanuts', 'None'];
        const conditions = ['Hypertension', 'Diabetes Type 2', 'Asthma', 'Arthritis', 'None'];
        const cities = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret'];

        for (let i = 1; i <= count; i++) {
            const gender = this.randomFrom(['Male', 'Female']);
            const firstName = this.randomFrom(firstNames[gender]);
            const lastName = this.randomFrom(lastNames);

            const patient = {
                id: `UPID-2026-${String(i).padStart(3, '0')}`,
                firstName,
                lastName,
                dateOfBirth: this.randomDate(new Date(1950, 0, 1), new Date(2010, 0, 1)),
                gender,
                phone: `+2547${this.randomNumber(10000000, 99999999)}`,
                email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
                address: {
                    street: `${this.randomNumber(1, 999)} ${this.randomFrom(['Main', 'Moi', 'Kenyatta', 'Uhuru'])} Street`,
                    city: this.randomFrom(cities),
                    county: this.randomFrom(cities),
                    country: 'Kenya'
                },
                bloodGroup: this.randomFrom(bloodGroups),
                allergies: [this.randomFrom(allergies)],
                chronicConditions: [this.randomFrom(conditions)],
                emergencyContact: {
                    name: `${this.randomFrom(firstNames[gender === 'Male' ? 'Female' : 'Male'])} ${this.randomFrom(lastNames)}`,
                    relationship: this.randomFrom(['Spouse', 'Parent', 'Sibling', 'Child']),
                    phone: `+2547${this.randomNumber(10000000, 99999999)}`
                },
                insurance: Math.random() > 0.3 ? {
                    provider: this.randomFrom(['AAR Insurance', 'Britam', 'CIC Insurance', 'NHIF']),
                    policyNumber: `POL-${this.randomNumber(1000, 9999)}`,
                    expiryDate: '2026-12-31'
                } : null,
                photo: null,
                registrationDate: this.randomDate(new Date(2024, 0, 1), new Date()),
                lastVisit: this.randomDate(new Date(2025, 0, 1), new Date()),
                status: 'Active',
                createdBy: 'RECEPTION-001',
                createdAt: this.randomDate(new Date(2024, 0, 1), new Date()),
                updatedAt: new Date().toISOString()
            };

            this.storage.add('patients', patient);
        }
    }

    /**
     * Generate drug catalog and batches
     */
    generateDrugs() {
        const drugs = [
            { name: 'Paracetamol', strength: '500mg', form: 'Tablet', category: 'Analgesics' },
            { name: 'Ibuprofen', strength: '400mg', form: 'Tablet', category: 'Analgesics' },
            { name: 'Aspirin', strength: '300mg', form: 'Tablet', category: 'Analgesics' },
            { name: 'Amoxicillin', strength: '500mg', form: 'Capsule', category: 'Antibiotics' },
            { name: 'Ciprofloxacin', strength: '500mg', form: 'Tablet', category: 'Antibiotics' },
            { name: 'Azithromycin', strength: '250mg', form: 'Tablet', category: 'Antibiotics' },
            { name: 'Metformin', strength: '500mg', form: 'Tablet', category: 'Antidiabetics' },
            { name: 'Glibenclamide', strength: '5mg', form: 'Tablet', category: 'Antidiabetics' },
            { name: 'Amlodipine', strength: '5mg', form: 'Tablet', category: 'Cardiovascular' },
            { name: 'Atenolol', strength: '50mg', form: 'Tablet', category: 'Cardiovascular' },
            { name: 'Enalapril', strength: '10mg', form: 'Tablet', category: 'Cardiovascular' },
            { name: 'Omeprazole', strength: '20mg', form: 'Capsule', category: 'Gastrointestinal' },
            { name: 'Ranitidine', strength: '150mg', form: 'Tablet', category: 'Gastrointestinal' },
            { name: 'Salbutamol', strength: '100mcg', form: 'Inhaler', category: 'Respiratory' },
            { name: 'Prednisolone', strength: '5mg', form: 'Tablet', category: 'Corticosteroids' },
            { name: 'Diclofenac', strength: '50mg', form: 'Tablet', category: 'Analgesics' },
            { name: 'Cetirizine', strength: '10mg', form: 'Tablet', category: 'Antihistamines' },
            { name: 'Multivitamin', strength: 'N/A', form: 'Tablet', category: 'Vitamins' }
        ];

        drugs.forEach((drug, i) => {
            const drugId = `DRUG-${String(i + 1).padStart(3, '0')}`;

            // Add drug to catalog
            this.storage.add('drugs', {
                id: drugId,
                name: drug.name,
                strength: drug.strength,
                form: drug.form,
                category: drug.category,
                description: `${drug.name} ${drug.strength} ${drug.form}`,
                createdAt: new Date().toISOString()
            });

            // Add 2-3 batches per drug
            const batchCount = this.randomNumber(2, 3);
            for (let j = 1; j <= batchCount; j++) {
                const costPrice = this.randomNumber(5, 50);
                this.storage.add('drug_batches', {
                    id: `BATCH-${drugId}-${j}`,
                    drugId,
                    drugName: `${drug.name} ${drug.strength}`,
                    category: drug.category,
                    form: drug.form,
                    strength: drug.strength,
                    batchNumber: `${drug.name.substring(0, 3).toUpperCase()}-2024-${String(j).padStart(3, '0')}`,
                    quantity: this.randomNumber(100, 1000),
                    expiryDate: this.randomDate(new Date(2026, 0, 1), new Date(2028, 11, 31)),
                    manufacturingDate: this.randomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
                    manufacturer: this.randomFrom(['Kenya Pharma Ltd', 'Universal Corporation', 'Dawa Ltd', 'Cosmos Pharma']),
                    costPrice,
                    sellingPrice: costPrice * this.randomNumber(1.5, 2.5),
                    reorderLevel: 100,
                    location: `Shelf ${this.randomFrom(['A', 'B', 'C'])}-${this.randomNumber(1, 20)}`,
                    status: 'Active',
                    createdAt: new Date().toISOString()
                });
            }
        });
    }

    /**
     * Generate lab test catalog
     */
    generateLabTests() {
        const tests = [
            { name: 'Complete Blood Count (CBC)', category: 'Hematology', sampleType: 'Blood', price: 1500, turnaround: '2 hours' },
            { name: 'Blood Group & Rh', category: 'Hematology', sampleType: 'Blood', price: 800, turnaround: '1 hour' },
            { name: 'ESR', category: 'Hematology', sampleType: 'Blood', price: 600, turnaround: '1 hour' },
            { name: 'Blood Glucose (Fasting)', category: 'Clinical Chemistry', sampleType: 'Blood', price: 500, turnaround: '1 hour' },
            { name: 'Lipid Profile', category: 'Clinical Chemistry', sampleType: 'Blood', price: 2000, turnaround: '4 hours' },
            { name: 'Liver Function Test', category: 'Clinical Chemistry', sampleType: 'Blood', price: 2500, turnaround: '4 hours' },
            { name: 'Kidney Function Test', category: 'Clinical Chemistry', sampleType: 'Blood', price: 2500, turnaround: '4 hours' },
            { name: 'Urinalysis', category: 'Urinalysis', sampleType: 'Urine', price: 800, turnaround: '1 hour' },
            { name: 'Urine Culture', category: 'Microbiology', sampleType: 'Urine', price: 2000, turnaround: '48 hours' },
            { name: 'Stool Analysis', category: 'Parasitology', sampleType: 'Stool', price: 1000, turnaround: '2 hours' },
            { name: 'HIV Test', category: 'Serology', sampleType: 'Blood', price: 1000, turnaround: '30 minutes' },
            { name: 'Hepatitis B Surface Antigen', category: 'Serology', sampleType: 'Blood', price: 1500, turnaround: '2 hours' },
            { name: 'Malaria Test', category: 'Parasitology', sampleType: 'Blood', price: 500, turnaround: '30 minutes' },
            { name: 'Pregnancy Test', category: 'Serology', sampleType: 'Urine', price: 500, turnaround: '15 minutes' },
            { name: 'Thyroid Function Test', category: 'Clinical Chemistry', sampleType: 'Blood', price: 3000, turnaround: '24 hours' }
        ];

        tests.forEach((test, i) => {
            this.storage.add('lab_tests', {
                id: `TEST-${String(i + 1).padStart(3, '0')}`,
                ...test,
                createdAt: new Date().toISOString()
            });
        });
    }

    /**
     * Generate patient visits
     */
    generateVisits(count) {
        const patients = this.storage.getAll('patients').slice(0, count);
        const diagnoses = [
            'Upper Respiratory Tract Infection',
            'Malaria',
            'Typhoid Fever',
            'Hypertension',
            'Diabetes Mellitus',
            'Gastroenteritis',
            'Urinary Tract Infection',
            'Headache',
            'Back Pain',
            'Skin Infection'
        ];

        patients.forEach((patient, i) => {
            const visitDate = this.randomDate(new Date(2026, 0, 1), new Date());

            this.storage.add('visits', {
                id: `VISIT-${String(i + 1).padStart(4, '0')}`,
                patientId: patient.id,
                patientName: `${patient.firstName} ${patient.lastName}`,
                doctorId: 'DOC-001',
                doctorName: 'Dr. Sarah Kimani',
                visitDate,
                chiefComplaint: this.randomFrom(['Fever', 'Headache', 'Cough', 'Abdominal pain', 'Chest pain']),
                diagnosis: this.randomFrom(diagnoses),
                notes: 'Patient examined and treated accordingly.',
                vitals: {
                    temperature: this.randomNumber(36, 39),
                    bloodPressure: `${this.randomNumber(110, 140)}/${this.randomNumber(70, 90)}`,
                    pulse: this.randomNumber(60, 100),
                    weight: this.randomNumber(50, 90)
                },
                status: 'Completed',
                createdAt: visitDate,
                updatedAt: visitDate
            });
        });
    }

    /**
     * Generate prescriptions
     */
    generatePrescriptions(count) {
        const visits = this.storage.getAll('visits').slice(0, count);
        const drugs = this.storage.getAll('drugs');

        visits.forEach((visit, i) => {
            const numDrugs = this.randomNumber(1, 3);
            const selectedDrugs = this.randomSample(drugs, numDrugs);

            const items = selectedDrugs.map((drug, j) => ({
                id: `RX-ITEM-${String(i + 1).padStart(3, '0')}-${j + 1}`,
                drugId: drug.id,
                drugName: `${drug.name} ${drug.strength}`,
                dosage: drug.strength,
                frequency: this.randomFrom(['Once daily', 'Twice daily', '3 times daily', 'Every 6 hours']),
                duration: this.randomFrom(['3 days', '5 days', '7 days', '14 days']),
                quantity: this.randomNumber(6, 30),
                instructions: this.randomFrom(['Take after meals', 'Take before meals', 'Take with water', 'Take at bedtime']),
                route: 'Oral'
            }));

            this.storage.add('prescriptions', {
                id: `RX-${String(i + 1).padStart(4, '0')}`,
                patientId: visit.patientId,
                patientName: visit.patientName,
                doctorId: visit.doctorId,
                doctorName: visit.doctorName,
                visitId: visit.id,
                date: visit.visitDate,
                status: this.randomFrom(['Pending', 'Dispensed']),
                items,
                diagnosis: visit.diagnosis,
                clinicalNotes: visit.notes,
                dispensedBy: null,
                dispensedAt: null,
                createdAt: visit.visitDate
            });
        });
    }

    /**
     * Generate lab requests
     */
    generateLabRequests(count) {
        const visits = this.storage.getAll('visits').slice(0, count);
        const tests = this.storage.getAll('lab_tests');

        visits.forEach((visit, i) => {
            const numTests = this.randomNumber(1, 3);
            const selectedTests = this.randomSample(tests, numTests);

            this.storage.add('lab_requests', {
                id: `LAB-${String(i + 1).padStart(4, '0')}`,
                patientId: visit.patientId,
                patientName: visit.patientName,
                doctorId: visit.doctorId,
                doctorName: visit.doctorName,
                requestDate: visit.visitDate,
                status: this.randomFrom(['Pending', 'Collected', 'InProgress', 'Completed']),
                urgency: this.randomFrom(['Routine', 'Urgent']),
                tests: selectedTests.map(test => ({
                    testId: test.id,
                    testName: test.name,
                    category: test.category,
                    sampleType: test.sampleType,
                    price: test.price
                })),
                clinicalNotes: visit.diagnosis,
                sampleCollectedBy: null,
                sampleCollectedAt: null,
                processedBy: null,
                completedAt: null,
                createdAt: visit.visitDate
            });
        });
    }

    /**
     * Generate bills
     */
    generateBills(count) {
        const visits = this.storage.getAll('visits').slice(0, count);

        visits.forEach((visit, i) => {
            const items = [
                {
                    id: `ITEM-${i + 1}-1`,
                    category: 'Consultation',
                    description: `General Consultation - ${visit.doctorName}`,
                    quantity: 1,
                    unitPrice: 1000,
                    total: 1000,
                    reference: visit.id
                }
            ];

            // Add prescription items if exists
            const prescription = this.storage.search('prescriptions', { visitId: visit.id })[0];
            if (prescription) {
                prescription.items.forEach((item, j) => {
                    const batch = this.storage.search('drug_batches', { drugId: item.drugId })[0];
                    if (batch) {
                        items.push({
                            id: `ITEM-${i + 1}-${j + 2}`,
                            category: 'Pharmacy',
                            description: `${item.drugName} x ${item.quantity}`,
                            quantity: item.quantity,
                            unitPrice: batch.sellingPrice,
                            total: item.quantity * batch.sellingPrice,
                            reference: prescription.id
                        });
                    }
                });
            }

            // Add lab items if exists
            const labRequest = this.storage.search('lab_requests', { patientId: visit.patientId })[0];
            if (labRequest) {
                labRequest.tests.forEach((test, j) => {
                    items.push({
                        id: `ITEM-${i + 1}-${items.length + 1}`,
                        category: 'Laboratory',
                        description: test.testName,
                        quantity: 1,
                        unitPrice: test.price,
                        total: test.price,
                        reference: labRequest.id
                    });
                });
            }

            const subtotal = items.reduce((sum, item) => sum + item.total, 0);
            const isPaid = Math.random() > 0.4;
            const amountPaid = isPaid ? subtotal : (Math.random() > 0.5 ? subtotal / 2 : 0);

            this.storage.add('bills', {
                id: `BILL-${String(i + 1).padStart(4, '0')}`,
                patientId: visit.patientId,
                patientName: visit.patientName,
                billDate: visit.visitDate,
                dueDate: new Date(new Date(visit.visitDate).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                status: amountPaid === 0 ? 'Pending' : (amountPaid === subtotal ? 'Paid' : 'PartiallyPaid'),
                items,
                subtotal,
                discount: 0,
                discountReason: null,
                tax: 0,
                total: subtotal,
                amountPaid,
                balance: subtotal - amountPaid,
                payments: amountPaid > 0 ? [{
                    id: `PAY-${i + 1}`,
                    amount: amountPaid,
                    method: this.randomFrom(['Cash', 'M-Pesa', 'Card']),
                    reference: `REF-${this.randomNumber(1000, 9999)}`,
                    date: visit.visitDate,
                    receivedBy: 'RECEPTION-001'
                }] : [],
                createdBy: 'RECEPTION-001',
                createdAt: visit.visitDate
            });
        });
    }

    /**
     * Generate current queue
     */
    generateQueue(count) {
        const patients = this.storage.getAll('patients').slice(0, count);
        const departments = ['General', 'Pediatrics', 'Dental', 'Gynecology'];

        patients.forEach((patient, i) => {
            this.storage.add('queue', {
                id: `QUEUE-${Date.now()}-${i}`,
                queueNumber: i + 1,
                patientId: patient.id,
                patientName: `${patient.firstName} ${patient.lastName}`,
                department: this.randomFrom(departments),
                priority: this.randomFrom(['Normal', 'Urgent']),
                status: 'Waiting',
                addedAt: new Date(Date.now() - (count - i) * 5 * 60 * 1000).toISOString(),
                addedBy: 'RECEPTION-001'
            });
        });
    }

    /**
     * Utility: Get random item from array
     */
    randomFrom(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    /**
     * Utility: Get random sample from array
     */
    randomSample(array, count) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    /**
     * Utility: Generate random date between two dates
     */
    randomDate(start, end) {
        const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return date.toISOString();
    }

    /**
     * Utility: Generate random number
     */
    randomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Initialize demo data generator
const demoData = new DemoDataGenerator(storage);
