import React from 'react';
import AppLayout from '@/components/AppLayout';

export default function Terms() {
  return (
    <AppLayout>
      <div className="container mx-auto mt-16 py-12 px-6 bg-gray-50 text-gray-700">
        <h1 className="text-3xl font-bold mb-8 text-center">利用規約</h1>
        <div className="max-w-3xl mx-auto">
          <p className="mb-6">
            この利用規約（以下，「本規約」といいます。）は，本サービス管理者（以下，「管理者」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。
          </p>
          <h2 className="text-2xl font-bold mb-4">第1条（適用）</h2>
          <p className="mb-6">
            本規約は，利用者と管理者との間の本サービスの利用に関わる一切の関係に適用されるものとします。
          </p>
          <h2 className="text-2xl font-bold mb-4">第2条（利用登録）</h2>
          <p className="mb-6">
            登録希望者が管理者の定める方法によって利用登録を申請し，管理者がこれを承認することによって，利用登録が完了するものとします。
          </p>
          <h2 className="text-2xl font-bold mb-4">第3条（ユーザーIDおよびパスワードの管理）</h2>
          <p className="mb-6">
            1. 利用者は，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
          </p>
          <h2 className="text-2xl font-bold mb-4">第4条（禁止事項）</h2>
          <p className="mb-6">
            1. 利用者は，以下の行為をしてはならないものとします。
            <ul className="list-disc list-inside ml-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>管理者のサーバーの稼働を妨げる行為</li>
              <li>管理者のサービスの運営を妨げる行為</li>
              <li>他の利用者に関する個人情報を収集または蓄積する行為</li>
            </ul>
          </p>
          <h2 className="text-2xl font-bold mb-4">第5条（本サービスの提供の停止等）</h2>
          <p className="mb-6">
            1. 管理者は，以下のいずれかの事由があると判断した場合，利用者に事前の通知なく本サービスの提供を停止または中断することができるものとします。
            <ul className="list-disc list-inside ml-4">
              <li>定期保守または緊急保守のために本サービスの提供が必要となった場合</li>
              <li>火災，停電，天災などの不可抗力により本サービスの提供が困難となった場合</li>
              <li>その他，管理者が本サービスの提供が困難と判断した場合</li>
            </ul>
          </p>
          <h2 className="text-2xl font-bold mb-4">第6条（利用制限および登録抹消）</h2>
          <p className="mb-6">
            1. 管理者は，利用者が以下のいずれかに該当する場合，事前の通知なく，利用者の登録を抹消し，または利用者による本サービスの利用を制限することができるものとします。
            <ul className="list-disc list-inside ml-4">
              <li>本規約のいずれかの条項に違反した場合</li>
              <li>登録事項に虚偽の事実があることが判明した場合</li>
              <li>その他，管理者が本サービスの利用を適当でないと判断した場合</li>
            </ul>
          </p>
          <h2 className="text-2xl font-bold mb-4">第7条（免責事項）</h2>
          <p className="mb-6">
            1. 管理者の債務不履行責任は，過失または故意によらない場合には免責されるものとします。
          </p>
          <h2 className="text-2xl font-bold mb-4">第8条（サービス内容の変更等）</h2>
          <p className="mb-6">
            管理者は，利用者に通知することなく，本サービスの内容を変更し，または本サービスの提供を中止することができるものとします。
          </p>
          <h2 className="text-2xl font-bold mb-4">第9条（利用規約の変更）</h2>
          <p className="mb-6">
            管理者は，必要と判断した場合には，本規約を変更することができるものとします。
          </p>
          <h2 className="text-2xl font-bold mb-4">第10条（通知または連絡）</h2>
          <p className="mb-6">
            1. 利用者と管理者との間の通知または連絡は，管理者の定める方法によって行うものとします。
          </p>
          <h2 className="text-2xl font-bold mb-4">第11条（権利義務の譲渡の禁止）</h2>
          <p className="mb-6">
            利用者は，管理者の書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
          </p>
          <h2 className="text-2xl font-bold mb-4">第12条（準拠法）</h2>
          <p className="mb-6">
            1. 本規約の解釈にあたっては，日本法を準拠法とします。
          </p>
          <h2 className="text-2xl font-bold mb-4">第13条（管轄）</h2>
          <p className="mb-6">
            1. 本規約に関連して紛争が生じた場合には，管理者の所在地を管轄する裁判所を専属的合意管轄とします。
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
