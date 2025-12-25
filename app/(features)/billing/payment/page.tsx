'use client';

import { useState } from 'react';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  email?: string;
  accountNumber?: string;
  isDefault: boolean;
}

export default function PaymentMethods() {
  const [showAddCard, setShowAddCard] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm_1',
      type: 'card',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true,
    },
    {
      id: 'pm_2',
      type: 'paypal',
      email: 'user@example.com',
      isDefault: false,
    },
  ]);

  const [newCard, setNewCard] = useState({
    cardNumber: '',
    cardholderName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    billingZip: '',
  });

  const handleAddCard = () => {
    // Simulate adding card
    const newMethod: PaymentMethod = {
      id: `pm_${Date.now()}`,
      type: 'card',
      last4: newCard.cardNumber.slice(-4),
      brand: 'Visa',
      expiryMonth: parseInt(newCard.expiryMonth),
      expiryYear: parseInt(newCard.expiryYear),
      isDefault: paymentMethods.length === 0,
    };

    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddCard(false);
    setNewCard({
      cardNumber: '',
      cardholderName: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      billingZip: '',
    });
  };

  const setDefaultMethod = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(pm => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
  };

  const removeMethod = (id: string) => {
    const method = paymentMethods.find(pm => pm.id === id);
    if (method?.isDefault && paymentMethods.length > 1) {
      alert('Please set another payment method as default before removing this one');
      return;
    }
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
  };

  return (
    <>
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Methods</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage your billing payment methods</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-4xl mx-auto">
          {/* Current Payment Methods */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Saved Payment Methods</h2>
              <button
                onClick={() => setShowAddCard(!showAddCard)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Add Payment Method
              </button>
            </div>

            <div className="space-y-4">
              {paymentMethods.map(method => (
                <div
                  key={method.id}
                  className="border border-gray-200 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    {method.type === 'card' && (
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
                        <svg
                          className="w-8 h-6 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                        </svg>
                      </div>
                    )}
                    {method.type === 'paypal' && (
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">PayPal</span>
                      </div>
                    )}

                    <div>
                      {method.type === 'card' && (
                        <>
                          <div className="font-semibold text-gray-900">
                            {method.brand} •••• {method.last4}
                          </div>
                          <div className="text-sm text-gray-600">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </div>
                        </>
                      )}
                      {method.type === 'paypal' && (
                        <>
                          <div className="font-semibold text-gray-900">PayPal</div>
                          <div className="text-sm text-gray-600">{method.email}</div>
                        </>
                      )}
                      {method.isDefault && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => setDefaultMethod(method.id)}
                        className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => removeMethod(method.id)}
                      className="px-3 py-1 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              {paymentMethods.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No payment methods saved. Add one to continue.
                </div>
              )}
            </div>
          </div>

          {/* Add New Card Form */}
          {showAddCard && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Add New Card</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={newCard.cardNumber}
                    onChange={e => setNewCard({ ...newCard, cardNumber: e.target.value })}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={newCard.cardholderName}
                    onChange={e => setNewCard({ ...newCard, cardholderName: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Month
                    </label>
                    <input
                      type="text"
                      value={newCard.expiryMonth}
                      onChange={e => setNewCard({ ...newCard, expiryMonth: e.target.value })}
                      placeholder="MM"
                      maxLength={2}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Year
                    </label>
                    <input
                      type="text"
                      value={newCard.expiryYear}
                      onChange={e => setNewCard({ ...newCard, expiryYear: e.target.value })}
                      placeholder="YYYY"
                      maxLength={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      value={newCard.cvv}
                      onChange={e => setNewCard({ ...newCard, cvv: e.target.value })}
                      placeholder="123"
                      maxLength={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing ZIP Code
                  </label>
                  <input
                    type="text"
                    value={newCard.billingZip}
                    onChange={e => setNewCard({ ...newCard, billingZip: e.target.value })}
                    placeholder="12345"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleAddCard}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Add Card
                  </button>
                  <button
                    onClick={() => setShowAddCard(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Payment Security */}
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Secure Payment Processing</h3>
                <p className="text-sm text-gray-700 mb-2">
                  All payment information is encrypted and securely stored. We use Stripe for
                  payment processing, ensuring PCI DSS compliance and bank-level security.
                </p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• 256-bit SSL encryption</li>
                  <li>• PCI DSS Level 1 certified</li>
                  <li>• Fraud detection and prevention</li>
                  <li>• No card details stored on our servers</li>
                </ul>
              </div>
            </div>
          </div>
        </main>
    </>
  );
}
