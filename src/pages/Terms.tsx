
import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Terms = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Terms and Conditions</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>1. Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              These Terms and Conditions govern your use of CampusHub, operated by College of Engineering Aranmula.
              By using our platform, you accept these terms and conditions in full.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>2. User Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              When you create an account on CampusHub, you must provide accurate and complete information. 
              You are responsible for maintaining the confidentiality of your account details.
            </p>
            <p className="mb-4">
              Users may be assigned different roles (student, admin, principal) with different levels of access and responsibilities.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>3. Points System</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              CampusHub features a points system that rewards students for participation in campus activities and responsible use of facilities.
            </p>
            <p className="mb-4">
              Points may be redeemed for rewards as offered by the platform. The administration reserves the right to modify point values and rewards at any time.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>4. Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              By creating an account, you consent to receive communications from administrators and authorized staff regarding campus events, announcements, and important updates.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>5. Privacy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use and protect your personal data.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>6. Contact</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              For any questions regarding these terms, please contact:
            </p>
            <p className="mb-2">
              <strong>College of Engineering Aranmula</strong>
            </p>
            <p className="mb-2">
              Email: albinbiju75100@gmail.com
            </p>
            <p className="mb-2">
              Phone: 7510903774
            </p>
            <p className="mb-4">
              Team Members: Albin Biju (Team Lead), Aromal M, Ansel A Jiji, Christo Mathew George
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Terms;
