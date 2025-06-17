// api/pilot-leads.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { website_url, email, first_name, business_type } = req.body;

    // Basic validation
    if (!website_url || !email || !first_name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate URL format
    try {
      new URL(website_url);
    } catch {
      return res.status(400).json({ error: 'Invalid website URL' });
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('yuno_leads')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (existing) {
      return res.status(400).json({ error: 'Email already registered for pilot program' });
    }

    // Insert to Supabase
    const { data, error } = await supabase
      .from('yuno_leads')
      .insert([{
        website_url: website_url.trim(),
        email: email.trim().toLowerCase(),
        first_name: first_name.trim(),
        business_type: business_type || null,
        status: 'new',
        source: 'pilot_program'
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Failed to submit pilot request' });
    }

    // TODO: Send confirmation email to user
    // TODO: Send notification to your team

    return res.status(200).json({ 
      success: true, 
      message: 'Pilot request submitted successfully',
      id: data[0].id 
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}