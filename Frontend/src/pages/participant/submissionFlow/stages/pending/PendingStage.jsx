export default function PendingStage({ submission }) {
    return (
      <div className="space-y-8">
  
        {/* ============================== */}
        {/* A. HEADER SECTION               */}
        {/* ============================== */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Your Submission is Under Review
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            You cannot make further changes. Our evaluation team is reviewing your project.
          </p>
        </div>
  
        {/* ============================== */}
        {/* B. STATUS CARD                  */}
        {/* ============================== */}
        <div className="border rounded-xl p-6 bg-yellow-50 border-yellow-200 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-yellow-600 text-3xl">⏳</div>
  
            <div>
              <h3 className="text-lg font-semibold text-yellow-800">
                Evaluation in Progress
              </h3>
  
              <p className="text-yellow-700 mt-2 leading-relaxed">
                Your project has been successfully submitted!<br/>
                Our evaluators are reviewing all submissions.  
                You will be notified once the evaluation is complete.
              </p>
  
              <div className="mt-4 space-y-2 text-sm">
                <p className="text-yellow-700">
                  🗓 <strong>Estimated Evaluation Time:</strong> 3–7 days
                </p>
                <p className="text-yellow-700">
                  🔄 You cannot make changes at this stage.
                </p>
                <p className="text-yellow-700">
                  🔔 You'll receive an email & dashboard alert after evaluation.
                </p>
              </div>
            </div>
          </div>
        </div>
  
        {/* ============================== */}
        {/* C. PROJECT SUMMARY SNAPSHOT     */}
        {/* ============================== */}
        <div className="border rounded-xl p-6 bg-white shadow-sm">
  
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Submission Summary
          </h3>
  
          <div className="space-y-3">
  
            <div>
              <p className="text-sm text-gray-500">Project Title</p>
              <p className="font-medium text-gray-800">
                {submission?.title || "—"}
              </p>
            </div>
  
            <div>
              <p className="text-sm text-gray-500">Event</p>
              <p className="font-medium text-gray-800">
                {submission?.event || "—"}
              </p>
            </div>
  
            <div>
              <p className="text-sm text-gray-500">Submitted On</p>
              <p className="text-gray-800">
                {submission?.submittedOn || "—"}
              </p>
            </div>
  
            <div>
              <p className="text-sm text-gray-500">Event Deadline</p>
              <p className="text-gray-800">
                {submission?.deadline || "—"}
              </p>
            </div>
  
            <div>
              <p className="text-sm text-gray-500">Event Code</p>
              <p className="text-gray-800">
                {submission?.secretCode || "—"}
              </p>
            </div>
  
            {/* READ ONLY NOTICE */}
            <div className="mt-5 px-4 py-3 rounded-lg bg-gray-100 text-gray-600 text-sm">
              This is a read-only snapshot of your submission.
            </div>
  
          </div>
        </div>
  
      </div>
    );
  }
  