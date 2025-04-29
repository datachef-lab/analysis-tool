-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."board_result_type" AS ENUM('FAIL', 'PASS');--> statement-breakpoint
CREATE TYPE "public"."class_type" AS ENUM('YEAR', 'SEMESTER');--> statement-breakpoint
CREATE TYPE "public"."community_type" AS ENUM('GUJARATI', 'NON-GUJARATI');--> statement-breakpoint
CREATE TYPE "public"."degree_level_type" AS ENUM('SECONDARY', 'HIGHER_SECONDARY', 'UNDER_GRADUATE', 'POST_GRADUATE');--> statement-breakpoint
CREATE TYPE "public"."degree_programme_type" AS ENUM('HONOURS', 'GENERAL');--> statement-breakpoint
CREATE TYPE "public"."disability_type" AS ENUM('VISUAL', 'HEARING_IMPAIRMENT', 'VISUAL_IMPAIRMENT', 'ORTHOPEDIC', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."framework_type" AS ENUM('CCF', 'CBCS');--> statement-breakpoint
CREATE TYPE "public"."gender_type" AS ENUM('MALE', 'FEMALE', 'TRANSGENDER');--> statement-breakpoint
CREATE TYPE "public"."locality_type" AS ENUM('RURAL', 'URBAN');--> statement-breakpoint
CREATE TYPE "public"."marksheet_source" AS ENUM('FILE_UPLOAD', 'ADDED');--> statement-breakpoint
CREATE TYPE "public"."paper_mode_type" AS ENUM('THEORETICAL', 'PRACTICAL', 'VIVA', 'ASSIGNMENT', 'PROJECT', 'MCQ');--> statement-breakpoint
CREATE TYPE "public"."parent_type" AS ENUM('BOTH', 'FATHER_ONLY', 'MOTHER_ONLY');--> statement-breakpoint
CREATE TYPE "public"."place_of_stay_type" AS ENUM('OWN', 'HOSTEL', 'FAMILY_FRIENDS', 'PAYING_GUEST', 'RELATIVES');--> statement-breakpoint
CREATE TYPE "public"."subject_category_type" AS ENUM('SPECIAL', 'COMMON', 'HONOURS', 'GENERAL', 'ELECTIVE');--> statement-breakpoint
CREATE TYPE "public"."subject_status" AS ENUM('PASS', 'FAIL');--> statement-breakpoint
CREATE TYPE "public"."transport_type" AS ENUM('BUS', 'TRAIN', 'METRO', 'AUTO', 'TAXI', 'CYCLE', 'WALKING', 'OTHER');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('ADMIN', 'STUDENT', 'TEACHER');--> statement-breakpoint
CREATE TABLE "address" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id_fk" integer,
	"state_id_fk" integer,
	"city_id_fk" integer,
	"address_line" varchar(1000),
	"landmark" varchar(255),
	"locality_type" "locality_type",
	"phone" varchar(255),
	"pincode" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"state_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"document_required" boolean DEFAULT false NOT NULL,
	"code" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "cities_name_unique" UNIQUE("name"),
	CONSTRAINT "cities_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "batches" (
	"id" serial PRIMARY KEY NOT NULL,
	"course_id_fk" integer NOT NULL,
	"class_id_fk" integer NOT NULL,
	"section_id_fk" integer,
	"shift_id_fk" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"session_id_fk" integer
);
--> statement-breakpoint
CREATE TABLE "academic_identifiers" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer NOT NULL,
	"rfid" varchar(255),
	"stream_id_fk" integer,
	"shift_id_fk" integer,
	"cu_form_number" varchar(255),
	"uid" varchar(255),
	"old_uid" varchar(255),
	"registration_number" varchar(255),
	"roll_number" varchar(255),
	"section_id_fk" integer,
	"class_roll_number" varchar(255),
	"apaar_id" varchar(255),
	"abc_id" varchar(255),
	"apprid" varchar(255),
	"check_repeat" boolean,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "academic_identifiers_student_id_fk_unique" UNIQUE("student_id_fk")
);
--> statement-breakpoint
CREATE TABLE "accommodation" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer,
	"place_of_stay" "place_of_stay_type",
	"address_id_fk" integer,
	"start_date" date,
	"end_date" date,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "accommodation_student_id_fk_unique" UNIQUE("student_id_fk")
);
--> statement-breakpoint
CREATE TABLE "board_universities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(700) NOT NULL,
	"degree_id" integer,
	"passing_marks" integer,
	"code" varchar(255),
	"address_id" integer,
	"sequence" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "board_universities_name_unique" UNIQUE("name"),
	CONSTRAINT "board_universities_sequence_unique" UNIQUE("sequence")
);
--> statement-breakpoint
CREATE TABLE "admissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer NOT NULL,
	"application_number" varchar(255),
	"applicant_signature" varchar(255),
	"year_of_admission" integer,
	"admission_date" date,
	"admission_code" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "admissions_student_id_fk_unique" UNIQUE("student_id_fk")
);
--> statement-breakpoint
CREATE TABLE "batch_papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"batch_id_fk" integer NOT NULL,
	"paper_id_fk" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "annual_incomes" (
	"id" serial PRIMARY KEY NOT NULL,
	"range" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blood_group" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "blood_group_type_unique" UNIQUE("type")
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"document_required" boolean,
	"code" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "disability_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "disability_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "countries" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"sequence" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "countries_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "classes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(500) NOT NULL,
	"type" "class_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"stream_id_fk" integer,
	"name" varchar(500) NOT NULL,
	"short_name" varchar(500),
	"code_prefix" varchar(10),
	"university_code" varchar(10),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "documents_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "family_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer NOT NULL,
	"parent_type" "parent_type",
	"father_details_person_id_fk" integer,
	"mother_details_person_id_fk" integer,
	"guardian_details_person_id_fk" integer,
	"annual_income_id_fk" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "family_details_student_id_fk_unique" UNIQUE("student_id_fk")
);
--> statement-breakpoint
CREATE TABLE "language_medium" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "language_medium_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "emergency_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer,
	"person_name" varchar(255),
	"relation_to_student" varchar(255),
	"email" varchar(255),
	"phone" varchar(255),
	"office_phone" varchar(255),
	"residential_phone" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "health" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer,
	"blood_group_id_fk" integer,
	"eye_power_left" numeric,
	"eye_power_right" numeric,
	"height" numeric,
	"width" numeric,
	"past_medical_history" text,
	"past_surgical_history" text,
	"drug_allergy" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "health_student_id_fk_unique" UNIQUE("student_id_fk")
);
--> statement-breakpoint
CREATE TABLE "offered_subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"subject_metadata_id_fk" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"from" date NOT NULL,
	"to" date NOT NULL,
	"is_current_session" boolean DEFAULT false NOT NULL,
	"code_prefix" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "marksheets" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer NOT NULL,
	"semester" integer NOT NULL,
	"year" integer NOT NULL,
	"sgpa" numeric,
	"cgpa" numeric,
	"classification" varchar(255),
	"remarks" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"source" "marksheet_source",
	"file" varchar(700),
	"created_by_user_id" integer NOT NULL,
	"updated_by_user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "nationality" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"sequence" integer,
	"code" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "nationality_sequence_unique" UNIQUE("sequence")
);
--> statement-breakpoint
CREATE TABLE "papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"offered_subject_id" integer NOT NULL,
	"name" varchar(500),
	"short_name" varchar(500),
	"mode" "paper_mode_type",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"display_name" varchar(500)
);
--> statement-breakpoint
CREATE TABLE "person" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255),
	"phone" varchar(255),
	"aadhaar_card_number" varchar(255),
	"image" varchar(255),
	"qualification_id_fk" integer,
	"occupation_id_fk" integer,
	"office_addres_id_fk" integer,
	"office_phone" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "occupations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "occupations_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "qualifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"sequence" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "qualifications_name_unique" UNIQUE("name"),
	CONSTRAINT "qualifications_sequence_unique" UNIQUE("sequence")
);
--> statement-breakpoint
CREATE TABLE "personal_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer NOT NULL,
	"nationality_id_fk" integer,
	"other_nationality_id_fk" integer,
	"aadhaar_card_number" varchar(16),
	"religion_id_fk" integer,
	"category_id_fk" integer,
	"mother_tongue_language_medium_id_fk" integer,
	"date_of_birth" date,
	"gender" "gender_type",
	"email" varchar(255),
	"alternative_email" varchar(255),
	"mailing_address_id_fk" integer,
	"residential_address_id_fk" integer,
	"disability" "disability_type",
	"disablity_code_id_fk" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "religion" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"sequence" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "religion_name_unique" UNIQUE("name"),
	CONSTRAINT "religion_sequence_unique" UNIQUE("sequence")
);
--> statement-breakpoint
CREATE TABLE "pickup_point" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "streams" (
	"id" serial PRIMARY KEY NOT NULL,
	"framework" "framework_type",
	"degree_id_fk" integer NOT NULL,
	"degree_programme" "degree_programme_type",
	"duration" integer,
	"number_of_semesters" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "shifts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(500) NOT NULL,
	"code_prefix" varchar(10) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "states" (
	"id" serial PRIMARY KEY NOT NULL,
	"country_id" integer NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "states_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "student_papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer NOT NULL,
	"batch_paper_id_fk" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subject_metadatas" (
	"id" serial PRIMARY KEY NOT NULL,
	"stream_id_fk" integer NOT NULL,
	"semester" integer NOT NULL,
	"specialization_id_fk" integer,
	"category" "subject_category_type",
	"subject_type_id_fk" integer,
	"irp_code" varchar(255),
	"marksheet_code" varchar(255) NOT NULL,
	"is_optional" boolean DEFAULT false,
	"credit" integer,
	"full_marks_theory" integer,
	"full_marks_internal" integer,
	"full_marks_practical" integer,
	"full_marks_project" integer,
	"full_marks_viva" integer,
	"full_marks" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"irp_name" varchar(500),
	"name" varchar(500),
	"theory_credit" integer,
	"practical_credit" integer,
	"internal_credit" integer,
	"project_credit" integer,
	"vival_credit" integer
);
--> statement-breakpoint
CREATE TABLE "transport_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer,
	"transport_id_fk" integer,
	"pickup_point_id_fk" integer,
	"seat_number" varchar(255),
	"pickup_time" time,
	"drop_off_time" time,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subject_types" (
	"id" serial PRIMARY KEY NOT NULL,
	"irp_name" varchar(500),
	"irp_short_name" varchar(500),
	"marksheet_name" varchar(500),
	"marksheet_short_name" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subjects" (
	"id" serial PRIMARY KEY NOT NULL,
	"marksheet_id_fk" integer,
	"subject_metadata_id_fk" integer,
	"year1" integer NOT NULL,
	"year2" integer,
	"internal_marks" integer,
	"practical_marks" integer,
	"theory_marks" integer,
	"total_marks" integer,
	"status" "subject_status",
	"ngp" numeric,
	"tgp" numeric,
	"letter_grade" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"internal_year" integer,
	"internal_credit" integer,
	"practical_year" integer,
	"practical_credit" integer,
	"theory_year" integer,
	"theory_credit" integer,
	"vival_marks" integer,
	"vival_year" integer,
	"vival_credit" integer,
	"project_marks" integer,
	"project_year" integer,
	"project_credit" integer
);
--> statement-breakpoint
CREATE TABLE "transport" (
	"id" serial PRIMARY KEY NOT NULL,
	"route_name" varchar(255),
	"mode" "transport_type" DEFAULT 'OTHER' NOT NULL,
	"vehicle_number" varchar(255),
	"driver_name" varchar(255),
	"provider_details" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "academic_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id_fk" integer NOT NULL,
	"last_institution_id_fk" integer,
	"last_board_university_id_fk" integer,
	"studied_up_to_class" integer,
	"passed_year" integer,
	"specialization_id" integer,
	"last_result_id_fk" integer,
	"remarks" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "institutions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(700) NOT NULL,
	"degree_id" integer NOT NULL,
	"address_id" integer,
	"sequence" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "institutions_name_unique" UNIQUE("name"),
	CONSTRAINT "institutions_sequence_unique" UNIQUE("sequence")
);
--> statement-breakpoint
CREATE TABLE "board_result_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"spcl_type" varchar(255) NOT NULL,
	"result" "board_result_type",
	"sequene" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "board_result_status_sequene_unique" UNIQUE("sequene")
);
--> statement-breakpoint
CREATE TABLE "specializations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"sequence" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "specializations_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id_fk" integer NOT NULL,
	"community" "community_type",
	"handicapped" boolean DEFAULT false,
	"specialization_id_fk" integer,
	"last_passed_year" integer,
	"notes" text,
	"active" boolean,
	"alumni" boolean,
	"leaving_date" timestamp,
	"leaving_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "degree" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"level" "degree_level_type",
	"sequence" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "degree_name_unique" UNIQUE("name"),
	CONSTRAINT "degree_sequence_unique" UNIQUE("sequence")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(500) NOT NULL,
	"password" varchar(255) NOT NULL,
	"phone" varchar(255),
	"whatsapp_number" varchar(255),
	"image" varchar(255),
	"type" "user_type" DEFAULT 'STUDENT',
	"disabled" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_city_id_fk_cities_id_fk" FOREIGN KEY ("city_id_fk") REFERENCES "public"."cities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_country_id_fk_countries_id_fk" FOREIGN KEY ("country_id_fk") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "address" ADD CONSTRAINT "address_state_id_fk_states_id_fk" FOREIGN KEY ("state_id_fk") REFERENCES "public"."states"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."states"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_class_id_fk_classes_id_fk" FOREIGN KEY ("class_id_fk") REFERENCES "public"."classes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_course_id_fk_courses_id_fk" FOREIGN KEY ("course_id_fk") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_section_id_fk_sections_id_fk" FOREIGN KEY ("section_id_fk") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_session_id_fk_sessions_id_fk" FOREIGN KEY ("session_id_fk") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batches" ADD CONSTRAINT "batches_shift_id_fk_shifts_id_fk" FOREIGN KEY ("shift_id_fk") REFERENCES "public"."shifts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_identifiers" ADD CONSTRAINT "academic_identifiers_section_id_fk_sections_id_fk" FOREIGN KEY ("section_id_fk") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_identifiers" ADD CONSTRAINT "academic_identifiers_shift_id_fk_shifts_id_fk" FOREIGN KEY ("shift_id_fk") REFERENCES "public"."shifts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_identifiers" ADD CONSTRAINT "academic_identifiers_stream_id_fk_streams_id_fk" FOREIGN KEY ("stream_id_fk") REFERENCES "public"."streams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_identifiers" ADD CONSTRAINT "academic_identifiers_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_address_id_fk_address_id_fk" FOREIGN KEY ("address_id_fk") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "accommodation" ADD CONSTRAINT "accommodation_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_universities" ADD CONSTRAINT "board_universities_address_id_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "board_universities" ADD CONSTRAINT "board_universities_degree_id_degree_id_fk" FOREIGN KEY ("degree_id") REFERENCES "public"."degree"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "admissions" ADD CONSTRAINT "admissions_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch_papers" ADD CONSTRAINT "batch_papers_batch_id_fk_batches_id_fk" FOREIGN KEY ("batch_id_fk") REFERENCES "public"."batches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "batch_papers" ADD CONSTRAINT "batch_papers_paper_id_fk_papers_id_fk" FOREIGN KEY ("paper_id_fk") REFERENCES "public"."papers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_stream_id_fk_streams_id_fk" FOREIGN KEY ("stream_id_fk") REFERENCES "public"."streams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_details" ADD CONSTRAINT "family_details_annual_income_id_fk_annual_incomes_id_fk" FOREIGN KEY ("annual_income_id_fk") REFERENCES "public"."annual_incomes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_details" ADD CONSTRAINT "family_details_father_details_person_id_fk_person_id_fk" FOREIGN KEY ("father_details_person_id_fk") REFERENCES "public"."person"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_details" ADD CONSTRAINT "family_details_guardian_details_person_id_fk_person_id_fk" FOREIGN KEY ("guardian_details_person_id_fk") REFERENCES "public"."person"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_details" ADD CONSTRAINT "family_details_mother_details_person_id_fk_person_id_fk" FOREIGN KEY ("mother_details_person_id_fk") REFERENCES "public"."person"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "family_details" ADD CONSTRAINT "family_details_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "emergency_contacts" ADD CONSTRAINT "emergency_contacts_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health" ADD CONSTRAINT "health_blood_group_id_fk_blood_group_id_fk" FOREIGN KEY ("blood_group_id_fk") REFERENCES "public"."blood_group"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health" ADD CONSTRAINT "health_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offered_subjects" ADD CONSTRAINT "offered_subjects_subject_metadata_id_fk_subject_metadatas_id_fk" FOREIGN KEY ("subject_metadata_id_fk") REFERENCES "public"."subject_metadatas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marksheets" ADD CONSTRAINT "marksheets_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marksheets" ADD CONSTRAINT "marksheets_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "marksheets" ADD CONSTRAINT "marksheets_updated_by_user_id_users_id_fk" FOREIGN KEY ("updated_by_user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "papers" ADD CONSTRAINT "papers_offered_subject_id_offered_subjects_id_fk" FOREIGN KEY ("offered_subject_id") REFERENCES "public"."offered_subjects"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_occupation_id_fk_occupations_id_fk" FOREIGN KEY ("occupation_id_fk") REFERENCES "public"."occupations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_office_addres_id_fk_address_id_fk" FOREIGN KEY ("office_addres_id_fk") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "person" ADD CONSTRAINT "person_qualification_id_fk_qualifications_id_fk" FOREIGN KEY ("qualification_id_fk") REFERENCES "public"."qualifications"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_category_id_fk_categories_id_fk" FOREIGN KEY ("category_id_fk") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_disablity_code_id_fk_disability_codes_id_fk" FOREIGN KEY ("disablity_code_id_fk") REFERENCES "public"."disability_codes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_mailing_address_id_fk_address_id_fk" FOREIGN KEY ("mailing_address_id_fk") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_mother_tongue_language_medium_id_fk_language_m" FOREIGN KEY ("mother_tongue_language_medium_id_fk") REFERENCES "public"."language_medium"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_nationality_id_fk_nationality_id_fk" FOREIGN KEY ("nationality_id_fk") REFERENCES "public"."nationality"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_other_nationality_id_fk_nationality_id_fk" FOREIGN KEY ("other_nationality_id_fk") REFERENCES "public"."nationality"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_religion_id_fk_religion_id_fk" FOREIGN KEY ("religion_id_fk") REFERENCES "public"."religion"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_residential_address_id_fk_address_id_fk" FOREIGN KEY ("residential_address_id_fk") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "personal_details" ADD CONSTRAINT "personal_details_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "streams" ADD CONSTRAINT "streams_degree_id_fk_degree_id_fk" FOREIGN KEY ("degree_id_fk") REFERENCES "public"."degree"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "states" ADD CONSTRAINT "states_country_id_countries_id_fk" FOREIGN KEY ("country_id") REFERENCES "public"."countries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_papers" ADD CONSTRAINT "student_papers_batch_paper_id_fk_batch_papers_id_fk" FOREIGN KEY ("batch_paper_id_fk") REFERENCES "public"."batch_papers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_papers" ADD CONSTRAINT "student_papers_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subject_metadatas" ADD CONSTRAINT "subject_metadatas_specialization_id_fk_specializations_id_fk" FOREIGN KEY ("specialization_id_fk") REFERENCES "public"."specializations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subject_metadatas" ADD CONSTRAINT "subject_metadatas_stream_id_fk_streams_id_fk" FOREIGN KEY ("stream_id_fk") REFERENCES "public"."streams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subject_metadatas" ADD CONSTRAINT "subject_metadatas_subject_type_id_fk_subject_types_id_fk" FOREIGN KEY ("subject_type_id_fk") REFERENCES "public"."subject_types"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transport_details" ADD CONSTRAINT "transport_details_pickup_point_id_fk_pickup_point_id_fk" FOREIGN KEY ("pickup_point_id_fk") REFERENCES "public"."pickup_point"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transport_details" ADD CONSTRAINT "transport_details_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "transport_details" ADD CONSTRAINT "transport_details_transport_id_fk_transport_id_fk" FOREIGN KEY ("transport_id_fk") REFERENCES "public"."transport"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_marksheet_id_fk_marksheets_id_fk" FOREIGN KEY ("marksheet_id_fk") REFERENCES "public"."marksheets"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subjects" ADD CONSTRAINT "subjects_subject_metadata_id_fk_subject_metadatas_id_fk" FOREIGN KEY ("subject_metadata_id_fk") REFERENCES "public"."subject_metadatas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_history" ADD CONSTRAINT "academic_history_last_board_university_id_fk_board_universities" FOREIGN KEY ("last_board_university_id_fk") REFERENCES "public"."board_universities"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_history" ADD CONSTRAINT "academic_history_last_institution_id_fk_institutions_id_fk" FOREIGN KEY ("last_institution_id_fk") REFERENCES "public"."institutions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_history" ADD CONSTRAINT "academic_history_last_result_id_fk_board_result_status_id_fk" FOREIGN KEY ("last_result_id_fk") REFERENCES "public"."board_result_status"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_history" ADD CONSTRAINT "academic_history_specialization_id_specializations_id_fk" FOREIGN KEY ("specialization_id") REFERENCES "public"."specializations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "academic_history" ADD CONSTRAINT "academic_history_student_id_fk_students_id_fk" FOREIGN KEY ("student_id_fk") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_address_id_address_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."address"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "institutions" ADD CONSTRAINT "institutions_degree_id_degree_id_fk" FOREIGN KEY ("degree_id") REFERENCES "public"."degree"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_specialization_id_fk_specializations_id_fk" FOREIGN KEY ("specialization_id_fk") REFERENCES "public"."specializations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fk_users_id_fk" FOREIGN KEY ("user_id_fk") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
*/