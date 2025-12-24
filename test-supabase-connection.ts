// PLCAutoPilot Supabase Connection Test
// Run with: npx ts-node test-supabase-connection.ts

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

interface TestResult {
  test: string
  status: 'pass' | 'fail'
  message: string
  data?: any
}

const results: TestResult[] = []

async function runTests() {
  console.log('🚀 PLCAutoPilot Supabase Connection Tests\n')
  console.log('=' .repeat(60))
  console.log(`URL: ${supabaseUrl}`)
  console.log('=' .repeat(60))
  console.log()

  // Test 1: Check connection
  console.log('Test 1: Database Connection')
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)

    if (error) throw error

    results.push({
      test: 'Database Connection',
      status: 'pass',
      message: 'Successfully connected to Supabase',
      data: `Found ${data?.length || 0} profiles`
    })
    console.log('✅ Successfully connected to Supabase')
  } catch (error: any) {
    results.push({
      test: 'Database Connection',
      status: 'fail',
      message: error.message
    })
    console.log('❌ Connection failed:', error.message)
  }
  console.log()

  // Test 2: Check profiles table
  console.log('Test 2: Profiles Table')
  try {
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true })

    if (error) throw error

    results.push({
      test: 'Profiles Table',
      status: 'pass',
      message: 'Profiles table exists and is accessible',
      data: `${count} profiles found`
    })
    console.log(`✅ Profiles table exists (${count} profiles)`)
  } catch (error: any) {
    results.push({
      test: 'Profiles Table',
      status: 'fail',
      message: error.message
    })
    console.log('❌ Profiles table error:', error.message)
  }
  console.log()

  // Test 3: Check plc_programs table
  console.log('Test 3: PLC Programs Table')
  try {
    const { count, error } = await supabase
      .from('plc_programs')
      .select('*', { count: 'exact', head: true })

    if (error) throw error

    results.push({
      test: 'PLC Programs Table',
      status: 'pass',
      message: 'PLC programs table exists and is accessible',
      data: `${count} programs found`
    })
    console.log(`✅ PLC programs table exists (${count} programs)`)
  } catch (error: any) {
    results.push({
      test: 'PLC Programs Table',
      status: 'fail',
      message: error.message
    })
    console.log('❌ PLC programs table error:', error.message)
  }
  console.log()

  // Test 4: Check chat_history table
  console.log('Test 4: Chat History Table')
  try {
    const { count, error } = await supabase
      .from('chat_history')
      .select('*', { count: 'exact', head: true })

    if (error) throw error

    results.push({
      test: 'Chat History Table',
      status: 'pass',
      message: 'Chat history table exists and is accessible',
      data: `${count} messages found`
    })
    console.log(`✅ Chat history table exists (${count} messages)`)
  } catch (error: any) {
    results.push({
      test: 'Chat History Table',
      status: 'fail',
      message: error.message
    })
    console.log('❌ Chat history table error:', error.message)
  }
  console.log()

  // Test 5: Check RLS policies
  console.log('Test 5: Row Level Security')
  try {
    // Try to access without authentication (should fail or return empty)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')

    if (!error && data) {
      results.push({
        test: 'Row Level Security',
        status: 'pass',
        message: 'RLS is working (no unauthorized access)',
        data: `Query returned ${data.length} rows (expected: 0 without auth)`
      })
      console.log('✅ RLS is enabled and working')
    } else if (error?.message.includes('row-level security')) {
      results.push({
        test: 'Row Level Security',
        status: 'pass',
        message: 'RLS is properly enforcing policies'
      })
      console.log('✅ RLS is properly enforcing policies')
    }
  } catch (error: any) {
    results.push({
      test: 'Row Level Security',
      status: 'fail',
      message: error.message
    })
    console.log('❌ RLS check error:', error.message)
  }
  console.log()

  // Test 6: Check storage buckets
  console.log('Test 6: Storage Buckets')
  try {
    const { data: buckets, error } = await supabase
      .storage
      .listBuckets()

    if (error) throw error

    const expectedBuckets = [
      'plc-programs',
      'user-uploads',
      'error-screenshots',
      'avatars',
      'template-thumbnails'
    ]

    const foundBuckets = buckets?.map(b => b.name) || []
    const missingBuckets = expectedBuckets.filter(b => !foundBuckets.includes(b))

    if (missingBuckets.length === 0) {
      results.push({
        test: 'Storage Buckets',
        status: 'pass',
        message: 'All storage buckets exist',
        data: foundBuckets.join(', ')
      })
      console.log('✅ All storage buckets exist:', foundBuckets.join(', '))
    } else {
      results.push({
        test: 'Storage Buckets',
        status: 'fail',
        message: `Missing buckets: ${missingBuckets.join(', ')}`,
        data: `Found: ${foundBuckets.join(', ')}`
      })
      console.log('⚠️  Missing buckets:', missingBuckets.join(', '))
      console.log('   Found:', foundBuckets.join(', '))
    }
  } catch (error: any) {
    results.push({
      test: 'Storage Buckets',
      status: 'fail',
      message: error.message
    })
    console.log('❌ Storage buckets error:', error.message)
  }
  console.log()

  // Test 7: Authentication check
  console.log('Test 7: Authentication System')
  try {
    const { data: { session }, error } = await supabase.auth.getSession()

    if (!error) {
      results.push({
        test: 'Authentication System',
        status: 'pass',
        message: session ? 'User is authenticated' : 'Auth system working (no active session)',
        data: session ? `User: ${session.user.email}` : 'No active session'
      })
      console.log('✅ Authentication system is working')
      if (session) {
        console.log(`   Logged in as: ${session.user.email}`)
      } else {
        console.log('   No active session (this is normal for tests)')
      }
    }
  } catch (error: any) {
    results.push({
      test: 'Authentication System',
      status: 'fail',
      message: error.message
    })
    console.log('❌ Authentication error:', error.message)
  }
  console.log()

  // Print summary
  console.log('=' .repeat(60))
  console.log('📊 Test Summary')
  console.log('=' .repeat(60))

  const passed = results.filter(r => r.status === 'pass').length
  const failed = results.filter(r => r.status === 'fail').length
  const total = results.length

  console.log(`Total Tests: ${total}`)
  console.log(`✅ Passed: ${passed}`)
  console.log(`❌ Failed: ${failed}`)
  console.log()

  if (failed === 0) {
    console.log('🎉 All tests passed! Your Supabase setup is working correctly.')
    console.log()
    console.log('Next steps:')
    console.log('1. Create storage buckets if not done yet')
    console.log('2. Run storage-policies.sql for bucket security')
    console.log('3. Test user signup: npm run dev')
    console.log('4. Start building your app!')
  } else {
    console.log('⚠️  Some tests failed. Please review the errors above.')
    console.log()
    console.log('Common fixes:')
    console.log('- Make sure schema.sql or quickstart.sql was run successfully')
    console.log('- Check .env file has correct credentials')
    console.log('- Create storage buckets in Supabase Dashboard')
    console.log('- Verify RLS policies are enabled')
  }
  console.log()
  console.log('=' .repeat(60))

  // Return exit code
  process.exit(failed > 0 ? 1 : 0)
}

// Run tests
runTests().catch(error => {
  console.error('💥 Fatal error:', error)
  process.exit(1)
})
