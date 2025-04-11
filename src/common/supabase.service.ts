import { Injectable } from '@nestjs/common';
import { supabase } from '../config/supabase.config';

@Injectable()
export class SupabaseService {
  async query<T>(table: string, select: string, match?: Record<string, any>) {
    return await supabase
      .from(table)
      .select(select)
      .match(match || {}) as any;
  }

  async insert<T>(table: string, data: Record<string, any>) {
    return await supabase
      .from(table)
      .insert(data)
      .select() as any;
  }

  async update<T>(table: string, data: Record<string, any>, match: Record<string, any>) {
    return await supabase
      .from(table)
      .update(data)
      .match(match)
      .select() as any;
  }

  async delete<T>(table: string, match: Record<string, any>) {
    return await supabase
      .from(table)
      .delete()
      .match(match)
      .select() as any;
  }
} 