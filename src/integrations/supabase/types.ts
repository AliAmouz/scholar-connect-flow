export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          created_at: string | null
          id: string
          message: string
          priority: Database["public"]["Enums"]["alert_priority"] | null
          read: boolean | null
          student_id: string | null
          teacher_id: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          alert_type: Database["public"]["Enums"]["alert_type"]
          created_at?: string | null
          id?: string
          message: string
          priority?: Database["public"]["Enums"]["alert_priority"] | null
          read?: boolean | null
          student_id?: string | null
          teacher_id?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          alert_type?: Database["public"]["Enums"]["alert_type"]
          created_at?: string | null
          id?: string
          message?: string
          priority?: Database["public"]["Enums"]["alert_priority"] | null
          read?: boolean | null
          student_id?: string | null
          teacher_id?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "alerts_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      announcements: {
        Row: {
          content: string
          created_at: string
          expires_at: string | null
          id: string
          priority: string
          title: string
        }
        Insert: {
          content: string
          created_at?: string
          expires_at?: string | null
          id?: string
          priority?: string
          title: string
        }
        Update: {
          content?: string
          created_at?: string
          expires_at?: string | null
          id?: string
          priority?: string
          title?: string
        }
        Relationships: []
      }
      attendance: {
        Row: {
          class_id: string | null
          created_at: string | null
          date: string
          id: string
          late: boolean | null
          notes: string | null
          present: boolean | null
          student_id: string | null
        }
        Insert: {
          class_id?: string | null
          created_at?: string | null
          date: string
          id?: string
          late?: boolean | null
          notes?: string | null
          present?: boolean | null
          student_id?: string | null
        }
        Update: {
          class_id?: string | null
          created_at?: string | null
          date?: string
          id?: string
          late?: boolean | null
          notes?: string | null
          present?: boolean | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          capacity: number | null
          created_at: string | null
          grade_level: number | null
          id: string
          name: string
          room_number: string | null
          schedule: string | null
          status: Database["public"]["Enums"]["class_status"] | null
          subject: string
          teacher_id: string | null
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          grade_level?: number | null
          id?: string
          name: string
          room_number?: string | null
          schedule?: string | null
          status?: Database["public"]["Enums"]["class_status"] | null
          subject: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          grade_level?: number | null
          id?: string
          name?: string
          room_number?: string | null
          schedule?: string | null
          status?: Database["public"]["Enums"]["class_status"] | null
          subject?: string
          teacher_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "classes_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      marks: {
        Row: {
          created_at: string
          id: string
          mark: number
          max_mark: number
          student_id: string
          subject: string
          term: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          mark: number
          max_mark?: number
          student_id: string
          subject: string
          term: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          mark?: number
          max_mark?: number
          student_id?: string
          subject?: string
          term?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "marks_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          description: string | null
          due_date: string
          id: string
          paid_date: string | null
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          description?: string | null
          due_date: string
          id?: string
          paid_date?: string | null
          status: string
          student_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          description?: string | null
          due_date?: string
          id?: string
          paid_date?: string | null
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          id: string
          monthly_fee: number | null
          service_name: string
          status: string
          student_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          monthly_fee?: number | null
          service_name: string
          status?: string
          student_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          monthly_fee?: number | null
          service_name?: string
          status?: string
          student_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      student_classes: {
        Row: {
          attendance_rate: number | null
          class_id: string | null
          created_at: string | null
          enrollment_date: string | null
          grade: number | null
          id: string
          student_id: string | null
        }
        Insert: {
          attendance_rate?: number | null
          class_id?: string | null
          created_at?: string | null
          enrollment_date?: string | null
          grade?: number | null
          id?: string
          student_id?: string | null
        }
        Update: {
          attendance_rate?: number | null
          class_id?: string | null
          created_at?: string | null
          enrollment_date?: string | null
          grade?: number | null
          id?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "student_classes_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          enrollment_date: string | null
          first_name: string
          grade_level: number | null
          id: string
          last_name: string
          parent_email: string | null
          parent_id: string | null
          status: Database["public"]["Enums"]["student_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          enrollment_date?: string | null
          first_name: string
          grade_level?: number | null
          id?: string
          last_name: string
          parent_email?: string | null
          parent_id?: string | null
          status?: Database["public"]["Enums"]["student_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          enrollment_date?: string | null
          first_name?: string
          grade_level?: number | null
          id?: string
          last_name?: string
          parent_email?: string | null
          parent_id?: string | null
          status?: Database["public"]["Enums"]["student_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      teachers: {
        Row: {
          created_at: string | null
          email: string
          first_name: string
          hire_date: string | null
          id: string
          last_name: string
          subject: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          first_name: string
          hire_date?: string | null
          id?: string
          last_name: string
          subject?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string
          hire_date?: string | null
          id?: string
          last_name?: string
          subject?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_missing_profiles: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_test_users: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_students_by_parent_email: {
        Args: { email_address: string }
        Returns: {
          first_name: string
          grade_level: number
          id: string
          last_name: string
          status: Database["public"]["Enums"]["student_status"]
        }[]
      }
      get_user_role: {
        Args: { user_uuid?: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      link_parent_to_students: {
        Args: { parent_email_address: string; parent_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      alert_priority: "low" | "medium" | "high" | "urgent"
      alert_type: "absence" | "late" | "behavior" | "academic" | "general"
      class_status: "active" | "completed" | "scheduled"
      student_status: "active" | "inactive" | "graduated"
      user_role: "admin" | "teacher" | "parent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      alert_priority: ["low", "medium", "high", "urgent"],
      alert_type: ["absence", "late", "behavior", "academic", "general"],
      class_status: ["active", "completed", "scheduled"],
      student_status: ["active", "inactive", "graduated"],
      user_role: ["admin", "teacher", "parent"],
    },
  },
} as const
