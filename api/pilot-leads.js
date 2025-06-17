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

    // Clean and normalize URL - UPDATED LOGIC
    let cleanUrl = website_url.trim();
    
    // Remove protocol if present
    cleanUrl = cleanUrl.replace(/^https?:\/\//, '');
    
    // Remove trailing slash
    cleanUrl = cleanUrl.replace(/\/$/, '');
    
    // Basic domain validation (optional - more flexible)
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.([a-zA-Z]{2,}|[a-zA-Z]{2,}\.[a-zA-Z]{2,})$/;
    if (!domainRegex.test(cleanUrl)) {
      return res.status(400).json({ error: 'Please enter a valid website URL (e.g., yoursite.com or www.yoursite.com)' });
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('yuno_leads')
      .select('id')
      .eq('email', email.trim().toLowerCase())
      .single();

    if (existing) {
      return res.status(400).json({ error: 'Email already registered for beta program' });
    }

    // Insert to Supabase - store clean URL
    const { data, error } = await supabase
      .from('yuno_leads')
      .insert([{
        website_url: cleanUrl, // Store without protocol
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
      message: 'Beta application submitted successfully',
      id: data[0].id 
    });

  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Server error' });
  }
}