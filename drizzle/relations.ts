import { relations } from "drizzle-orm/relations";
import { cities, address, countries, states, classes, batches, courses, sections, sessions, shifts, academicIdentifiers, streams, students, accommodation, boardUniversities, degree, admissions, batchPapers, papers, annualIncomes, familyDetails, person, emergencyContacts, bloodGroup, health, subjectMetadatas, offeredSubjects, users, marksheets, occupations, qualifications, categories, personalDetails, disabilityCodes, languageMedium, nationality, religion, studentPapers, specializations, subjectTypes, pickupPoint, transportDetails, transport, subjects, academicHistory, institutions, boardResultStatus } from "./schema";

export const addressRelations = relations(address, ({one, many}) => ({
	city: one(cities, {
		fields: [address.cityIdFk],
		references: [cities.id]
	}),
	country: one(countries, {
		fields: [address.countryIdFk],
		references: [countries.id]
	}),
	state: one(states, {
		fields: [address.stateIdFk],
		references: [states.id]
	}),
	accommodations: many(accommodation),
	boardUniversities: many(boardUniversities),
	people: many(person),
	personalDetails_mailingAddressIdFk: many(personalDetails, {
		relationName: "personalDetails_mailingAddressIdFk_address_id"
	}),
	personalDetails_residentialAddressIdFk: many(personalDetails, {
		relationName: "personalDetails_residentialAddressIdFk_address_id"
	}),
	institutions: many(institutions),
}));

export const citiesRelations = relations(cities, ({one, many}) => ({
	addresses: many(address),
	state: one(states, {
		fields: [cities.stateId],
		references: [states.id]
	}),
}));

export const countriesRelations = relations(countries, ({many}) => ({
	addresses: many(address),
	states: many(states),
}));

export const statesRelations = relations(states, ({one, many}) => ({
	addresses: many(address),
	cities: many(cities),
	country: one(countries, {
		fields: [states.countryId],
		references: [countries.id]
	}),
}));

export const batchesRelations = relations(batches, ({one, many}) => ({
	class: one(classes, {
		fields: [batches.classIdFk],
		references: [classes.id]
	}),
	course: one(courses, {
		fields: [batches.courseIdFk],
		references: [courses.id]
	}),
	section: one(sections, {
		fields: [batches.sectionIdFk],
		references: [sections.id]
	}),
	session: one(sessions, {
		fields: [batches.sessionIdFk],
		references: [sessions.id]
	}),
	shift: one(shifts, {
		fields: [batches.shiftIdFk],
		references: [shifts.id]
	}),
	batchPapers: many(batchPapers),
}));

export const classesRelations = relations(classes, ({many}) => ({
	batches: many(batches),
}));

export const coursesRelations = relations(courses, ({one, many}) => ({
	batches: many(batches),
	stream: one(streams, {
		fields: [courses.streamIdFk],
		references: [streams.id]
	}),
}));

export const sectionsRelations = relations(sections, ({many}) => ({
	batches: many(batches),
	academicIdentifiers: many(academicIdentifiers),
}));

export const sessionsRelations = relations(sessions, ({many}) => ({
	batches: many(batches),
}));

export const shiftsRelations = relations(shifts, ({many}) => ({
	batches: many(batches),
	academicIdentifiers: many(academicIdentifiers),
}));

export const academicIdentifiersRelations = relations(academicIdentifiers, ({one}) => ({
	section: one(sections, {
		fields: [academicIdentifiers.sectionIdFk],
		references: [sections.id]
	}),
	shift: one(shifts, {
		fields: [academicIdentifiers.shiftIdFk],
		references: [shifts.id]
	}),
	stream: one(streams, {
		fields: [academicIdentifiers.streamIdFk],
		references: [streams.id]
	}),
	student: one(students, {
		fields: [academicIdentifiers.studentIdFk],
		references: [students.id]
	}),
}));

export const streamsRelations = relations(streams, ({one, many}) => ({
	academicIdentifiers: many(academicIdentifiers),
	courses: many(courses),
	degree: one(degree, {
		fields: [streams.degreeIdFk],
		references: [degree.id]
	}),
	subjectMetadatas: many(subjectMetadatas),
}));

export const studentsRelations = relations(students, ({one, many}) => ({
	academicIdentifiers: many(academicIdentifiers),
	accommodations: many(accommodation),
	admissions: many(admissions),
	familyDetails: many(familyDetails),
	emergencyContacts: many(emergencyContacts),
	health: many(health),
	marksheets: many(marksheets),
	personalDetails: many(personalDetails),
	studentPapers: many(studentPapers),
	transportDetails: many(transportDetails),
	academicHistories: many(academicHistory),
	specialization: one(specializations, {
		fields: [students.specializationIdFk],
		references: [specializations.id]
	}),
	user: one(users, {
		fields: [students.userIdFk],
		references: [users.id]
	}),
}));

export const accommodationRelations = relations(accommodation, ({one}) => ({
	address: one(address, {
		fields: [accommodation.addressIdFk],
		references: [address.id]
	}),
	student: one(students, {
		fields: [accommodation.studentIdFk],
		references: [students.id]
	}),
}));

export const boardUniversitiesRelations = relations(boardUniversities, ({one, many}) => ({
	address: one(address, {
		fields: [boardUniversities.addressId],
		references: [address.id]
	}),
	degree: one(degree, {
		fields: [boardUniversities.degreeId],
		references: [degree.id]
	}),
	academicHistories: many(academicHistory),
}));

export const degreeRelations = relations(degree, ({many}) => ({
	boardUniversities: many(boardUniversities),
	streams: many(streams),
	institutions: many(institutions),
}));

export const admissionsRelations = relations(admissions, ({one}) => ({
	student: one(students, {
		fields: [admissions.studentIdFk],
		references: [students.id]
	}),
}));

export const batchPapersRelations = relations(batchPapers, ({one, many}) => ({
	batch: one(batches, {
		fields: [batchPapers.batchIdFk],
		references: [batches.id]
	}),
	paper: one(papers, {
		fields: [batchPapers.paperIdFk],
		references: [papers.id]
	}),
	studentPapers: many(studentPapers),
}));

export const papersRelations = relations(papers, ({one, many}) => ({
	batchPapers: many(batchPapers),
	offeredSubject: one(offeredSubjects, {
		fields: [papers.offeredSubjectId],
		references: [offeredSubjects.id]
	}),
}));

export const familyDetailsRelations = relations(familyDetails, ({one}) => ({
	annualIncome: one(annualIncomes, {
		fields: [familyDetails.annualIncomeIdFk],
		references: [annualIncomes.id]
	}),
	person_fatherDetailsPersonIdFk: one(person, {
		fields: [familyDetails.fatherDetailsPersonIdFk],
		references: [person.id],
		relationName: "familyDetails_fatherDetailsPersonIdFk_person_id"
	}),
	person_guardianDetailsPersonIdFk: one(person, {
		fields: [familyDetails.guardianDetailsPersonIdFk],
		references: [person.id],
		relationName: "familyDetails_guardianDetailsPersonIdFk_person_id"
	}),
	person_motherDetailsPersonIdFk: one(person, {
		fields: [familyDetails.motherDetailsPersonIdFk],
		references: [person.id],
		relationName: "familyDetails_motherDetailsPersonIdFk_person_id"
	}),
	student: one(students, {
		fields: [familyDetails.studentIdFk],
		references: [students.id]
	}),
}));

export const annualIncomesRelations = relations(annualIncomes, ({many}) => ({
	familyDetails: many(familyDetails),
}));

export const personRelations = relations(person, ({one, many}) => ({
	familyDetails_fatherDetailsPersonIdFk: many(familyDetails, {
		relationName: "familyDetails_fatherDetailsPersonIdFk_person_id"
	}),
	familyDetails_guardianDetailsPersonIdFk: many(familyDetails, {
		relationName: "familyDetails_guardianDetailsPersonIdFk_person_id"
	}),
	familyDetails_motherDetailsPersonIdFk: many(familyDetails, {
		relationName: "familyDetails_motherDetailsPersonIdFk_person_id"
	}),
	occupation: one(occupations, {
		fields: [person.occupationIdFk],
		references: [occupations.id]
	}),
	address: one(address, {
		fields: [person.officeAddresIdFk],
		references: [address.id]
	}),
	qualification: one(qualifications, {
		fields: [person.qualificationIdFk],
		references: [qualifications.id]
	}),
}));

export const emergencyContactsRelations = relations(emergencyContacts, ({one}) => ({
	student: one(students, {
		fields: [emergencyContacts.studentIdFk],
		references: [students.id]
	}),
}));

export const healthRelations = relations(health, ({one}) => ({
	bloodGroup: one(bloodGroup, {
		fields: [health.bloodGroupIdFk],
		references: [bloodGroup.id]
	}),
	student: one(students, {
		fields: [health.studentIdFk],
		references: [students.id]
	}),
}));

export const bloodGroupRelations = relations(bloodGroup, ({many}) => ({
	health: many(health),
}));

export const offeredSubjectsRelations = relations(offeredSubjects, ({one, many}) => ({
	subjectMetadata: one(subjectMetadatas, {
		fields: [offeredSubjects.subjectMetadataIdFk],
		references: [subjectMetadatas.id]
	}),
	papers: many(papers),
}));

export const subjectMetadatasRelations = relations(subjectMetadatas, ({one, many}) => ({
	offeredSubjects: many(offeredSubjects),
	specialization: one(specializations, {
		fields: [subjectMetadatas.specializationIdFk],
		references: [specializations.id]
	}),
	stream: one(streams, {
		fields: [subjectMetadatas.streamIdFk],
		references: [streams.id]
	}),
	subjectType: one(subjectTypes, {
		fields: [subjectMetadatas.subjectTypeIdFk],
		references: [subjectTypes.id]
	}),
	subjects: many(subjects),
}));

export const marksheetsRelations = relations(marksheets, ({one, many}) => ({
	user_createdByUserId: one(users, {
		fields: [marksheets.createdByUserId],
		references: [users.id],
		relationName: "marksheets_createdByUserId_users_id"
	}),
	student: one(students, {
		fields: [marksheets.studentIdFk],
		references: [students.id]
	}),
	user_updatedByUserId: one(users, {
		fields: [marksheets.updatedByUserId],
		references: [users.id],
		relationName: "marksheets_updatedByUserId_users_id"
	}),
	subjects: many(subjects),
}));

export const usersRelations = relations(users, ({many}) => ({
	marksheets_createdByUserId: many(marksheets, {
		relationName: "marksheets_createdByUserId_users_id"
	}),
	marksheets_updatedByUserId: many(marksheets, {
		relationName: "marksheets_updatedByUserId_users_id"
	}),
	students: many(students),
}));

export const occupationsRelations = relations(occupations, ({many}) => ({
	people: many(person),
}));

export const qualificationsRelations = relations(qualifications, ({many}) => ({
	people: many(person),
}));

export const personalDetailsRelations = relations(personalDetails, ({one}) => ({
	category: one(categories, {
		fields: [personalDetails.categoryIdFk],
		references: [categories.id]
	}),
	disabilityCode: one(disabilityCodes, {
		fields: [personalDetails.disablityCodeIdFk],
		references: [disabilityCodes.id]
	}),
	address_mailingAddressIdFk: one(address, {
		fields: [personalDetails.mailingAddressIdFk],
		references: [address.id],
		relationName: "personalDetails_mailingAddressIdFk_address_id"
	}),
	languageMedium: one(languageMedium, {
		fields: [personalDetails.motherTongueLanguageMediumIdFk],
		references: [languageMedium.id]
	}),
	nationality_nationalityIdFk: one(nationality, {
		fields: [personalDetails.nationalityIdFk],
		references: [nationality.id],
		relationName: "personalDetails_nationalityIdFk_nationality_id"
	}),
	nationality_otherNationalityIdFk: one(nationality, {
		fields: [personalDetails.otherNationalityIdFk],
		references: [nationality.id],
		relationName: "personalDetails_otherNationalityIdFk_nationality_id"
	}),
	religion: one(religion, {
		fields: [personalDetails.religionIdFk],
		references: [religion.id]
	}),
	address_residentialAddressIdFk: one(address, {
		fields: [personalDetails.residentialAddressIdFk],
		references: [address.id],
		relationName: "personalDetails_residentialAddressIdFk_address_id"
	}),
	student: one(students, {
		fields: [personalDetails.studentIdFk],
		references: [students.id]
	}),
}));

export const categoriesRelations = relations(categories, ({many}) => ({
	personalDetails: many(personalDetails),
}));

export const disabilityCodesRelations = relations(disabilityCodes, ({many}) => ({
	personalDetails: many(personalDetails),
}));

export const languageMediumRelations = relations(languageMedium, ({many}) => ({
	personalDetails: many(personalDetails),
}));

export const nationalityRelations = relations(nationality, ({many}) => ({
	personalDetails_nationalityIdFk: many(personalDetails, {
		relationName: "personalDetails_nationalityIdFk_nationality_id"
	}),
	personalDetails_otherNationalityIdFk: many(personalDetails, {
		relationName: "personalDetails_otherNationalityIdFk_nationality_id"
	}),
}));

export const religionRelations = relations(religion, ({many}) => ({
	personalDetails: many(personalDetails),
}));

export const studentPapersRelations = relations(studentPapers, ({one}) => ({
	batchPaper: one(batchPapers, {
		fields: [studentPapers.batchPaperIdFk],
		references: [batchPapers.id]
	}),
	student: one(students, {
		fields: [studentPapers.studentIdFk],
		references: [students.id]
	}),
}));

export const specializationsRelations = relations(specializations, ({many}) => ({
	subjectMetadatas: many(subjectMetadatas),
	academicHistories: many(academicHistory),
	students: many(students),
}));

export const subjectTypesRelations = relations(subjectTypes, ({many}) => ({
	subjectMetadatas: many(subjectMetadatas),
}));

export const transportDetailsRelations = relations(transportDetails, ({one}) => ({
	pickupPoint: one(pickupPoint, {
		fields: [transportDetails.pickupPointIdFk],
		references: [pickupPoint.id]
	}),
	student: one(students, {
		fields: [transportDetails.studentIdFk],
		references: [students.id]
	}),
	transport: one(transport, {
		fields: [transportDetails.transportIdFk],
		references: [transport.id]
	}),
}));

export const pickupPointRelations = relations(pickupPoint, ({many}) => ({
	transportDetails: many(transportDetails),
}));

export const transportRelations = relations(transport, ({many}) => ({
	transportDetails: many(transportDetails),
}));

export const subjectsRelations = relations(subjects, ({one}) => ({
	marksheet: one(marksheets, {
		fields: [subjects.marksheetIdFk],
		references: [marksheets.id]
	}),
	subjectMetadata: one(subjectMetadatas, {
		fields: [subjects.subjectMetadataIdFk],
		references: [subjectMetadatas.id]
	}),
}));

export const academicHistoryRelations = relations(academicHistory, ({one}) => ({
	boardUniversity: one(boardUniversities, {
		fields: [academicHistory.lastBoardUniversityIdFk],
		references: [boardUniversities.id]
	}),
	institution: one(institutions, {
		fields: [academicHistory.lastInstitutionIdFk],
		references: [institutions.id]
	}),
	boardResultStatus: one(boardResultStatus, {
		fields: [academicHistory.lastResultIdFk],
		references: [boardResultStatus.id]
	}),
	specialization: one(specializations, {
		fields: [academicHistory.specializationId],
		references: [specializations.id]
	}),
	student: one(students, {
		fields: [academicHistory.studentIdFk],
		references: [students.id]
	}),
}));

export const institutionsRelations = relations(institutions, ({one, many}) => ({
	academicHistories: many(academicHistory),
	address: one(address, {
		fields: [institutions.addressId],
		references: [address.id]
	}),
	degree: one(degree, {
		fields: [institutions.degreeId],
		references: [degree.id]
	}),
}));

export const boardResultStatusRelations = relations(boardResultStatus, ({many}) => ({
	academicHistories: many(academicHistory),
}));